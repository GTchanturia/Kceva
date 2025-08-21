<script>
    /**
     * Length Converter Component
     * Convert between different length units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'm';
    let toUnit = 'ft';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Length units with conversion factors to meters
    const lengthUnits = [
        // Metric
        { value: 'mm', label: 'Millimeters (mm)', factor: 0.001, category: 'Metric' },
        { value: 'cm', label: 'Centimeters (cm)', factor: 0.01, category: 'Metric' },
        { value: 'm', label: 'Meters (m)', factor: 1, category: 'Metric' },
        { value: 'km', label: 'Kilometers (km)', factor: 1000, category: 'Metric' },
        
        // Imperial/US
        { value: 'in', label: 'Inches (in)', factor: 0.0254, category: 'Imperial' },
        { value: 'ft', label: 'Feet (ft)', factor: 0.3048, category: 'Imperial' },
        { value: 'yd', label: 'Yards (yd)', factor: 0.9144, category: 'Imperial' },
        { value: 'mi', label: 'Miles (mi)', factor: 1609.344, category: 'Imperial' },
        
        // Nautical
        { value: 'nmi', label: 'Nautical Miles (nmi)', factor: 1852, category: 'Nautical' },
        { value: 'fathom', label: 'Fathoms', factor: 1.8288, category: 'Nautical' },
        
        // Other
        { value: 'mil', label: 'Mils (thou)', factor: 0.0000254, category: 'Other' },
        { value: 'μm', label: 'Micrometers (μm)', factor: 0.000001, category: 'Other' },
        { value: 'nm', label: 'Nanometers (nm)', factor: 0.000000001, category: 'Other' },
        { value: 'ly', label: 'Light Years', factor: 9.461e15, category: 'Astronomical' },
        { value: 'au', label: 'Astronomical Units (AU)', factor: 1.496e11, category: 'Astronomical' }
    ];

    // Convert length
    function convertLength() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = lengthUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = lengthUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        // Convert to meters first, then to target unit
        const meters = inputValue * fromFactor;
        convertedValue = meters / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertLength();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertLength();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return lengthUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }

    // Get common conversions
    function getCommonConversions() {
        const fromFactor = lengthUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const commonUnits = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'];
        
        return commonUnits
            .filter(unit => unit !== fromUnit)
            .map(unit => {
                const toFactor = lengthUnits.find(u => u.value === unit)?.factor || 1;
                const meters = inputValue * fromFactor;
                const converted = meters / toFactor;
                return {
                    unit,
                    label: lengthUnits.find(u => u.value === unit)?.label || unit,
                    value: converted
                };
            });
    }

    $: commonConversions = showResults ? getCommonConversions() : [];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Length Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Length Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between metric, imperial, nautical, and other length units. 
                Supports everything from nanometers to light years.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Length Value"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.000001"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={lengthUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={lengthUnits}
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
                    <div class="text-sm">Conversion</div>
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
                            <span class="text-gray-600">Conversion Factor:</span>
                            <span class="font-semibold">1 {fromUnit} = {formatNumber(convertedValue / inputValue, 8)} {toUnit}</span>
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

        <!-- Unit Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Length Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">Metric System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Nanometer (nm):</span>
                                <span class="font-medium">10⁻⁹ m</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Micrometer (μm):</span>
                                <span class="font-medium">10⁻⁶ m</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Millimeter (mm):</span>
                                <span class="font-medium">10⁻³ m</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Centimeter (cm):</span>
                                <span class="font-medium">10⁻² m</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Meter (m):</span>
                                <span class="font-medium">Base unit</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Kilometer (km):</span>
                                <span class="font-medium">10³ m</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Imperial System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Mil (thou):</span>
                                <span class="font-medium">0.001 in</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Inch (in):</span>
                                <span class="font-medium">2.54 cm</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Foot (ft):</span>
                                <span class="font-medium">12 in</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Yard (yd):</span>
                                <span class="font-medium">3 ft</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Mile (mi):</span>
                                <span class="font-medium">5,280 ft</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-purple-900">Specialized Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Nautical Mile:</span>
                                <span class="font-medium">1,852 m</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Fathom:</span>
                                <span class="font-medium">6 ft</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Astronomical Unit:</span>
                                <span class="font-medium">~150M km</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Light Year:</span>
                                <span class="font-medium">~9.5T km</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Conversion Examples -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Length Comparisons
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Everyday Objects</h4>
                            <div class="text-blue-800 text-sm space-y-1">
                                <div>• Credit card: ~85mm × 54mm</div>
                                <div>• US Letter paper: 8.5" × 11"</div>
                                <div>• Standard door: ~80" (2m) tall</div>
                                <div>• Football field: 100 yards</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Human Scale</h4>
                            <div class="text-green-800 text-sm space-y-1">
                                <div>• Human hair: ~70 micrometers</div>
                                <div>• Average height: ~1.7m (5'7")</div>
                                )
                                <div>• Arm span ≈ height</div>
                                <div>• Walking pace: ~5 km/h</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">Large Distances</h4>
                            <div class="text-purple-800 text-sm space-y-1">
                                <div>• Earth circumference: ~40,000 km</div>
                                <div>• Moon distance: ~384,400 km</div>
                                <div>• Sun distance: ~150M km (1 AU)</div>
                                <div>• Nearest star: ~4.2 light years</div>
                            </div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Small Scales</h4>
                            <div class="text-orange-800 text-sm space-y-1">
                                <div>• Red blood cell: ~7 micrometers</div>
                                <div>• Bacteria: ~1-5 micrometers</div>
                                <div>• Virus: ~100 nanometers</div>
                                <div>• Atom: ~0.1 nanometers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>