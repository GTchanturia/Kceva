<script>
    /**
     * Weight Converter Component
     * Convert between different units of weight and mass
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let value = 1;
    let fromUnit = 'kg';
    let toUnit = 'lb';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Weight units with conversion factors to grams
    const weightUnits = [
        // Metric units
        { value: 'mg', label: 'Milligrams (mg)', factor: 0.001, category: 'Metric' },
        { value: 'g', label: 'Grams (g)', factor: 1, category: 'Metric' },
        { value: 'kg', label: 'Kilograms (kg)', factor: 1000, category: 'Metric' },
        { value: 't', label: 'Metric Tons (t)', factor: 1000000, category: 'Metric' },
        
        // Imperial units
        { value: 'oz', label: 'Ounces (oz)', factor: 28.3495, category: 'Imperial' },
        { value: 'lb', label: 'Pounds (lb)', factor: 453.592, category: 'Imperial' },
        { value: 'st', label: 'Stones (st)', factor: 6350.29, category: 'Imperial' },
        { value: 'ton_us', label: 'US Tons', factor: 907185, category: 'Imperial' },
        { value: 'ton_uk', label: 'UK Tons', factor: 1016047, category: 'Imperial' },
        
        // Troy units (precious metals)
        { value: 'gr', label: 'Grains (gr)', factor: 0.0647989, category: 'Troy' },
        { value: 'dwt', label: 'Pennyweights (dwt)', factor: 1.55517, category: 'Troy' },
        { value: 'oz_t', label: 'Troy Ounces (oz t)', factor: 31.1035, category: 'Troy' },
        { value: 'lb_t', label: 'Troy Pounds (lb t)', factor: 373.242, category: 'Troy' },
        
        // Other units
        { value: 'ct', label: 'Carats (ct)', factor: 0.2, category: 'Jewelry' },
        { value: 'μg', label: 'Micrograms (μg)', factor: 0.000001, category: 'Scientific' }
    ];

    // Convert weight
    function convertWeight() {
        if (value === null || value === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = weightUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = weightUnits.find(unit => unit.value === toUnit)?.factor || 1;

        // Convert to grams first, then to target unit
        const grams = value * fromFactor;
        convertedValue = grams / toFactor;

        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertWeight();
    }

    // Auto-convert when inputs change
    $: if (value !== null && fromUnit && toUnit) {
        convertWeight();
    }

    // Get unit category
    function getUnitCategory(unitValue) {
        return weightUnits.find(unit => unit.value === unitValue)?.category || 'Other';
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return weightUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Weight Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Weight Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different units of weight and mass. Supports metric, 
                imperial, troy, and scientific units with high precision calculations.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Weight Value"
                        bind:value
                        placeholder="1"
                        step="0.001"
                        min="0"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={weightUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={weightUnits}
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
                            <span class="text-gray-600">From Unit:</span>
                            <span class="font-semibold">{getUnitLabel(fromUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">To Unit:</span>
                            <span class="font-semibold">{getUnitLabel(toUnit)}</span>
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
                            <span class="text-gray-600">In Grams:</span>
                            <span class="font-semibold">
                                {formatNumber(value * (weightUnits.find(u => u.value === fromUnit)?.factor || 1), 6)} g
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
                    {#each weightUnits.filter(unit => unit.value !== fromUnit).slice(0, 8) as unit}
                        {@const grams = value * (weightUnits.find(u => u.value === fromUnit)?.factor || 1)}
                        {@const converted = grams / unit.factor}
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

        <!-- Common Weight Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Weight Conversions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Metric System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 kilogram (kg)</span>
                                <span class="font-medium">1,000 grams</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 gram (g)</span>
                                <span class="font-medium">1,000 milligrams</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 metric ton (t)</span>
                                <span class="font-medium">1,000 kilograms</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 milligram (mg)</span>
                                <span class="font-medium">1,000 micrograms</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Imperial System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 pound (lb)</span>
                                <span class="font-medium">16 ounces</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 stone (st)</span>
                                <span class="font-medium">14 pounds</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 US ton</span>
                                <span class="font-medium">2,000 pounds</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 UK ton</span>
                                <span class="font-medium">2,240 pounds</span>
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
                    Weight Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            ⚖️ Metric
                        </h4>
                        <p class="text-blue-800 text-sm">
                            International standard system based on grams. 
                            Used worldwide for scientific and everyday measurements.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🇺🇸 Imperial
                        </h4>
                        <p class="text-green-800 text-sm">
                            Traditional system used primarily in the US and UK. 
                            Based on pounds, ounces, and stones.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            💎 Troy
                        </h4>
                        <p class="text-purple-800 text-sm">
                            Specialized system for precious metals and gems. 
                            Troy ounces are heavier than regular ounces.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            💍 Jewelry
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Carats are used specifically for measuring 
                            the weight of gemstones and pearls.
                        </p>
                    </div>

                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 class="font-semibold text-red-900 mb-2">
                            🔬 Scientific
                        </h4>
                        <p class="text-red-800 text-sm">
                            Very small units like micrograms used in 
                            laboratory and pharmaceutical applications.
                        </p>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Practical Applications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Practical Applications
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 class="font-semibold text-gray-900 mb-2">
                            🍳 Cooking & Baking
                        </h4>
                        <p class="text-gray-700 text-sm">
                            Convert recipe ingredients between metric and imperial units. 
                            Essential for international recipes and precise measurements.
                        </p>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 class="font-semibold text-gray-900 mb-2">
                            🏋️ Fitness & Health
                        </h4>
                        <p class="text-gray-700 text-sm">
                            Track body weight, convert supplement dosages, 
                            and understand nutrition labels in different units.
                        </p>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 class="font-semibold text-gray-900 mb-2">
                            📦 Shipping & Logistics
                        </h4>
                        <p class="text-gray-700 text-sm">
                            Calculate shipping costs, convert package weights, 
                            and comply with international shipping requirements.
                        </p>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 class="font-semibold text-gray-900 mb-2">
                            💎 Precious Metals
                        </h4>
                        <p class="text-gray-700 text-sm">
                            Convert between troy ounces and other units for 
                            gold, silver, and other precious metal investments.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>