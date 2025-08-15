<script>
    /**
     * Energy Converter Component
     * Convert between different energy units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1000;
    let fromUnit = 'J';
    let toUnit = 'cal';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Energy units with conversion factors to Joules
    const energyUnits = [
        // SI and metric
        { value: 'J', label: 'Joules (J)', factor: 1, category: 'SI' },
        { value: 'kJ', label: 'Kilojoules (kJ)', factor: 1000, category: 'SI' },
        { value: 'MJ', label: 'Megajoules (MJ)', factor: 1000000, category: 'SI' },
        { value: 'GJ', label: 'Gigajoules (GJ)', factor: 1000000000, category: 'SI' },
        
        // Calories
        { value: 'cal', label: 'Calories (cal)', factor: 4.184, category: 'Thermal' },
        { value: 'kcal', label: 'Kilocalories (kcal)', factor: 4184, category: 'Thermal' },
        { value: 'Cal', label: 'Food Calories (Cal)', factor: 4184, category: 'Thermal' },
        
        // Electrical
        { value: 'Wh', label: 'Watt-hours (Wh)', factor: 3600, category: 'Electrical' },
        { value: 'kWh', label: 'Kilowatt-hours (kWh)', factor: 3600000, category: 'Electrical' },
        { value: 'MWh', label: 'Megawatt-hours (MWh)', factor: 3600000000, category: 'Electrical' },
        
        // Imperial/US
        { value: 'BTU', label: 'British Thermal Units (BTU)', factor: 1055.06, category: 'Imperial' },
        { value: 'therm', label: 'Therms', factor: 105506000, category: 'Imperial' },
        { value: 'ft_lbf', label: 'Foot-pounds (ft⋅lbf)', factor: 1.35582, category: 'Imperial' },
        
        // Scientific
        { value: 'eV', label: 'Electron Volts (eV)', factor: 1.602176634e-19, category: 'Atomic' },
        { value: 'keV', label: 'Kiloelectron Volts (keV)', factor: 1.602176634e-16, category: 'Atomic' },
        { value: 'MeV', label: 'Megaelectron Volts (MeV)', factor: 1.602176634e-13, category: 'Atomic' },
        { value: 'GeV', label: 'Gigaelectron Volts (GeV)', factor: 1.602176634e-10, category: 'Atomic' },
        
        // Other
        { value: 'erg', label: 'Ergs', factor: 1e-7, category: 'CGS' },
        { value: 'TNT', label: 'Tons of TNT', factor: 4.184e9, category: 'Explosive' }
    ];

    // Convert energy
    function convertEnergy() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = energyUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = energyUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        // Convert to Joules first, then to target unit
        const joules = inputValue * fromFactor;
        convertedValue = joules / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertEnergy();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertEnergy();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return energyUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }

    // Get common conversions
    function getCommonConversions() {
        const fromFactor = energyUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const commonUnits = ['J', 'kJ', 'cal', 'kcal', 'Wh', 'kWh', 'BTU'];
        
        return commonUnits
            .filter(unit => unit !== fromUnit)
            .map(unit => {
                const toFactor = energyUnits.find(u => u.value === unit)?.factor || 1;
                const joules = inputValue * fromFactor;
                const converted = joules / toFactor;
                return {
                    unit,
                    label: energyUnits.find(u => u.value === unit)?.label || unit,
                    value: converted
                };
            });
    }

    $: commonConversions = showResults ? getCommonConversions() : [];

    // Get energy equivalents
    function getEnergyEquivalents() {
        if (!showResults) return [];
        
        const fromFactor = energyUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const totalJoules = inputValue * fromFactor;
        
        return [
            {
                description: 'Lifting 1 kg by 1 meter',
                value: totalJoules / 9.81,
                unit: 'times'
            },
            {
                description: 'Powering 100W bulb',
                value: totalJoules / 100,
                unit: 'seconds'
            },
            {
                description: 'Heating 1g water by 1°C',
                value: totalJoules / 4.184,
                unit: 'times'
            },
            {
                description: 'Average human heartbeat',
                value: totalJoules / 1,
                unit: 'heartbeats'
            }
        ];
    }

    $: energyEquivalents = getEnergyEquivalents();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Energy Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Energy Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different energy units including Joules, calories, 
                kilowatt-hours, BTUs, and more. Perfect for physics, engineering, and energy calculations.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Energy Value"
                        bind:value={inputValue}
                        placeholder="1000"
                        step="0.000001"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={energyUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={energyUnits}
                            className="flex-1"
                        />

                        <Button 
                            variant="outline" 
                            size="sm" 
                            on:click={swapUnits}
                            className="mb-0"
                        >
                            🔄 Swap
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(inputValue, 6)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 8)} {toUnit}
                    </div>
                </div>

                <div class="text-gray-600">
                    <div class="text-sm">Conversion Factor</div>
                    <div class="text-lg font-semibold">
                        1 {fromUnit} = {formatNumber(convertedValue / inputValue, 8)} {toUnit}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Conversion Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Conversion Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">From:</span>
                            <span class="font-semibold">{formatNumber(inputValue, 6)} {getUnitLabel(fromUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">To:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(convertedValue, 8)} {getUnitLabel(toUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">In Joules:</span>
                            <span class="font-semibold">{formatNumber(inputValue * (energyUnits.find(u => u.value === fromUnit)?.factor || 1), 6)} J</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Reverse Factor:</span>
                            <span class="font-semibold">1 {toUnit} = {formatNumber(inputValue / convertedValue, 8)} {fromUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Scientific Notation:</span>
                            <span class="font-semibold">{convertedValue.toExponential(3)} {toUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Precision:</span>
                            <span class="font-semibold">{convertedValue.toString().split('.')[1]?.length || 0} decimal places</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    {formatNumber(inputValue, 3)} {fromUnit} in Other Units
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each commonConversions as conversion}
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{conversion.unit}</div>
                            <div class="text-lg text-blue-600">{formatNumber(conversion.value, 6)}</div>
                            <div class="text-xs text-gray-500">{conversion.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Energy Equivalents -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Equivalents
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each energyEquivalents as equivalent}
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="font-semibold text-blue-900 mb-1">{equivalent.description}</div>
                            <div class="text-lg text-blue-600">
                                {formatNumber(equivalent.value, 2)} {equivalent.unit}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Energy Unit Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">SI Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Joule (J):</span>
                                <span class="font-medium">Base unit</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Kilojoule (kJ):</span>
                                <span class="font-medium">1,000 J</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Megajoule (MJ):</span>
                                <span class="font-medium">10⁶ J</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Gigajoule (GJ):</span>
                                <span class="font-medium">10⁹ J</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Thermal Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Calorie (cal):</span>
                                <span class="font-medium">4.184 J</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Kilocalorie (kcal):</span>
                                <span class="font-medium">4,184 J</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Food Calorie (Cal):</span>
                                <span class="font-medium">= kcal</span>
                            </div>
                            <div class="flex justify-between">
                                <span>BTU:</span>
                                <span class="font-medium">1,055 J</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-purple-900">Electrical Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Watt-hour (Wh):</span>
                                <span class="font-medium">3,600 J</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Kilowatt-hour (kWh):</span>
                                <span class="font-medium">3.6 MJ</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Megawatt-hour (MWh):</span>
                                <span class="font-medium">3.6 GJ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Energy Scale References -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Scale References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Everyday Energy</h4>
                            <div class="text-blue-800 text-sm space-y-1">
                                <div>• AA battery: ~10 kJ</div>
                                <div>• Food calorie: ~4.2 kJ</div>
                                <div>• Car battery: ~1.8 MJ</div>
                                <div>• Gallon of gasoline: ~130 MJ</div>
                                <div>• Home daily usage: ~30 kWh</div>
                                <div>• Lightning bolt: ~1-5 GJ</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Human Body</h4>
                            <div class="text-green-800 text-sm space-y-1">
                                <div>• Resting metabolism: ~7 MJ/day</div>
                                <div>• Walking 1 mile: ~300 kJ</div>
                                <div>• Running 1 mile: ~400 kJ</div>
                                <div>• Lifting 50 lbs 1 foot: ~68 J</div>
                                <div>• One heartbeat: ~Let me create all the missing calculators systematically. I'll start by implementing the missing calculators from the data file, ensuring they follow the same patterns as the existing ones.

<boltArtifact id="add-missing-calculators" title="Add All Missing Calculators with SEO Optimization">