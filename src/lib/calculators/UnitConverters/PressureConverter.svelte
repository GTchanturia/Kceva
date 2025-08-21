<script>
    /**
     * Pressure Converter Component
     * Convert between different pressure units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'atm';
    let toUnit = 'psi';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Pressure units with conversion factors to Pascal
    const pressureUnits = [
        // SI units
        { value: 'Pa', label: 'Pascal (Pa)', factor: 1, category: 'SI' },
        { value: 'kPa', label: 'Kilopascal (kPa)', factor: 1000, category: 'SI' },
        { value: 'MPa', label: 'Megapascal (MPa)', factor: 1000000, category: 'SI' },
        { value: 'GPa', label: 'Gigapascal (GPa)', factor: 1000000000, category: 'SI' },
        
        // Common units
        { value: 'bar', label: 'Bar', factor: 100000, category: 'Metric' },
        { value: 'mbar', label: 'Millibar (mbar)', factor: 100, category: 'Metric' },
        { value: 'atm', label: 'Atmosphere (atm)', factor: 101325, category: 'Standard' },
        { value: 'psi', label: 'Pounds per Square Inch (psi)', factor: 6894.76, category: 'Imperial' },
        
        // Other units
        { value: 'mmHg', label: 'Millimeters of Mercury (mmHg)', factor: 133.322, category: 'Medical' },
        { value: 'inHg', label: 'Inches of Mercury (inHg)', factor: 3386.39, category: 'Medical' },
        { value: 'torr', label: 'Torr', factor: 133.322, category: 'Scientific' },
        { value: 'psf', label: 'Pounds per Square Foot (psf)', factor: 47.8803, category: 'Imperial' }
    ];

    // Convert pressure
    function convertPressure() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = pressureUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = pressureUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        const pascals = inputValue * fromFactor;
        convertedValue = pascals / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertPressure();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertPressure();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return pressureUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Pressure Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Pressure Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different pressure units including Pascal, Bar, PSI, atmosphere, 
                and more. Perfect for engineering, weather, and scientific applications.
            </p>

            <div class="space-y-6">
                <div>
                    <Input
                        type="number"
                        label="Pressure Value"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.001"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={pressureUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={pressureUnits}
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

        <!-- Pressure References -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Pressure References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">Atmospheric Pressures</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Sea level:</span>
                                <span class="font-medium">1 atm (14.7 psi)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Denver (5,280 ft):</span>
                                <span class="font-medium">0.83 atm (12.2 psi)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Commercial aircraft:</span>
                                <span class="font-medium">0.75 atm (11 psi)</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Tire Pressures</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Car tires:</span>
                                <span class="font-medium">30-35 psi</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Bicycle tires:</span>
                                <span class="font-medium">80-130 psi</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Truck tires:</span>
                                <span class="font-medium">80-100 psi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>