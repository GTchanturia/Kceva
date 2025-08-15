<script>
    /**
     * Length Converter Component
     * Convert between different units of length and distance
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let value = 1;
    let fromUnit = 'm';
    let toUnit = 'ft';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Length units with conversion factors to meters
    const lengthUnits = [
        // Metric units
        { value: 'mm', label: 'Millimeters (mm)', factor: 0.001, category: 'Metric' },
        { value: 'cm', label: 'Centimeters (cm)', factor: 0.01, category: 'Metric' },
        { value: 'm', label: 'Meters (m)', factor: 1, category: 'Metric' },
        { value: 'km', label: 'Kilometers (km)', factor: 1000, category: 'Metric' },
        
        // Imperial units
        { value: 'in', label: 'Inches (in)', factor: 0.0254, category: 'Imperial' },
        { value: 'ft', label: 'Feet (ft)', factor: 0.3048, category: 'Imperial' },
        { value: 'yd', label: 'Yards (yd)', factor: 0.9144, category: 'Imperial' },
        { value: 'mi', label: 'Miles (mi)', factor: 1609.344, category: 'Imperial' },
        
        // Nautical
        { value: 'nmi', label: 'Nautical Miles (nmi)', factor: 1852, category: 'Nautical' },
        
        // Other units
        { value: 'μm', label: 'Micrometers (μm)', factor: 0.000001, category: 'Scientific' },
        { value: 'nm', label: 'Nanometers (nm)', factor: 0.000000001, category: 'Scientific' },
        { value: 'ly', label: 'Light Years (ly)', factor: 9.461e15, category: 'Astronomical' },
        { value: 'au', label: 'Astronomical Units (AU)', factor: 1.496e11, category: 'Astronomical' }
    ];

    // Convert length
    function convertLength() {
        if (value === null || value === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = lengthUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = lengthUnits.find(unit => unit.value === toUnit)?.factor || 1;

        // Convert to meters first, then to target unit
        const meters = value * fromFactor;
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
    $: if (value !== null && fromUnit && toUnit) {
        convertLength();
    }

    // Get unit category
    function getUnitCategory(unitValue) {
        return lengthUnits.find(unit => unit.value === unitValue)?.category || 'Other';
    }

    // Get common conversions
    function getCommonConversions() {
        const fromFactor = lengthUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const commonValues = [1, 5, 10, 25, 50, 100];
        
        return commonValues.map(val => {
            const meters = val * fromFactor;
            return {
                input: val,
                conversions: lengthUnits
                    .filter(unit => unit.value !== fromUnit)
                    .slice(0, 6)
                    .map(unit => ({
                        unit: unit.value,
                        label: unit.label,
                        value: meters / unit.factor
                    }))
            };
        });
    }

    $: commonConversions = getCommonConversions();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Length Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Length Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different units of length and distance. Supports metric, 
                imperial, nautical, and scientific units with high precision.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Value"
                        bind:value
                        placeholder="1"
                        step="0.001"
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
                        {formatNumber(value, 6)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 6)} {toUnit}
                    </div>
                </div>

                <div class="text-gray-600">
                    <div class="text-sm">
                        {getUnitCategory(fromUnit)} → {getUnitCategory(toUnit)}
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
                            <span class="text-gray-600">Input Value:</span>
                            <span class="font-semibold">{formatNumber(value, 6)} {fromUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">From Category:</span>
                            <span class="font-semibold">{getUnitCategory(fromUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">To Category:</span>
                            <span class="font-semibold">{getUnitCategory(toUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Conversion Factor:</span>
                            <span class="font-semibold">
                                {formatNumber(convertedValue / value, 8)}
                            </span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Result:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(convertedValue, 6)} {toUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Scientific Notation:</span>
                            <span class="font-semibold">{convertedValue.toExponential(3)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Rounded (2 decimals):</span>
                            <span class="font-semibold">{formatNumber(convertedValue, 2)} {toUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">In Meters:</span>
                            <span class="font-semibold">
                                {formatNumber(value * (lengthUnits.find(u => u.value === fromUnit)?.factor || 1), 6)} m
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Multiple Unit Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Convert to Multiple Units
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each lengthUnits.filter(unit => unit.value !== fromUnit).slice(0, 8) as unit}
                        {@const meters = value * (lengthUnits.find(u => u.value === fromUnit)?.factor || 1)}
                        {@const converted = meters / unit.factor}
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="text-lg font-bold text-gray-900 mb-1">
                                {formatNumber(converted, 4)}
                            </div>
                            <div class="text-sm text-gray-600">{unit.value}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Common Conversions Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Length Conversions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Metric System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 kilometer (km)</span>
                                <span class="font-medium">1,000 meters</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 meter (m)</span>
                                <span class="font-medium">100 centimeters</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 centimeter (cm)</span>
                                <span class="font-medium">10 millimeters</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 millimeter (mm)</span>
                                <span class="font-medium">1,000 micrometers</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Imperial System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 mile (mi)</span>
                                <span class="font-medium">5,280 feet</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 yard (yd)</span>
                                <span class="font-medium">3 feet</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 foot (ft)</span>
                                <span class="font-medium">12 inches</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 inch (in)</span>
                                <span class="font-medium">2.54 centimeters</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Unit Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Length Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📏 Metric
                        </h4>
                        <p class="text-blue-800 text-sm">
                            International standard system based on powers of 10. 
                            Used worldwide for scientific and everyday measurements.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🇺🇸 Imperial
                        </h4>
                        <p class="text-green-800 text-sm">
                            Traditional system used primarily in the United States. 
                            Based on historical measurements and fractions.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            🔬 Scientific
                        </h4>
                        <p class="text-purple-800 text-sm">
                            Very small units used in scientific research, 
                            including micrometers and nanometers.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🌌 Astronomical
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Extremely large units for measuring distances 
                            in space, like light years and AU.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>