<script>
    /**
     * Volume Converter Component
     * Convert between different volume units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'L';
    let toUnit = 'gal_us';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Volume units with conversion factors to liters
    const volumeUnits = [
        // Metric
        { value: 'mL', label: 'Milliliters (mL)', factor: 0.001, category: 'Metric' },
        { value: 'L', label: 'Liters (L)', factor: 1, category: 'Metric' },
        { value: 'm3', label: 'Cubic Meters (m³)', factor: 1000, category: 'Metric' },
        { value: 'cm3', label: 'Cubic Centimeters (cm³)', factor: 0.001, category: 'Metric' },
        
        // US Liquid
        { value: 'fl_oz_us', label: 'US Fluid Ounces (fl oz)', factor: 0.0295735, category: 'US Liquid' },
        { value: 'cup_us', label: 'US Cups', factor: 0.236588, category: 'US Liquid' },
        { value: 'pt_us', label: 'US Pints (pt)', factor: 0.473176, category: 'US Liquid' },
        { value: 'qt_us', label: 'US Quarts (qt)', factor: 0.946353, category: 'US Liquid' },
        { value: 'gal_us', label: 'US Gallons (gal)', factor: 3.78541, category: 'US Liquid' },
        
        // Imperial
        { value: 'fl_oz_uk', label: 'Imperial Fluid Ounces', factor: 0.0284131, category: 'Imperial' },
        { value: 'pt_uk', label: 'Imperial Pints', factor: 0.568261, category: 'Imperial' },
        { value: 'qt_uk', label: 'Imperial Quarts', factor: 1.13652, category: 'Imperial' },
        { value: 'gal_uk', label: 'Imperial Gallons', factor: 4.54609, category: 'Imperial' },
        
        // Cooking
        { value: 'tsp', label: 'Teaspoons (tsp)', factor: 0.00492892, category: 'Cooking' },
        { value: 'tbsp', label: 'Tablespoons (tbsp)', factor: 0.0147868, category: 'Cooking' },
        
        // Other
        { value: 'bbl', label: 'Barrels (oil)', factor: 158.987, category: 'Industrial' },
        { value: 'in3', label: 'Cubic Inches (in³)', factor: 0.0163871, category: 'Imperial' },
        { value: 'ft3', label: 'Cubic Feet (ft³)', factor: 28.3168, category: 'Imperial' }
    ];

    // Convert volume
    function convertVolume() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = volumeUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = volumeUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        const liters = inputValue * fromFactor;
        convertedValue = liters / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertVolume();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertVolume();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return volumeUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Volume Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between liters, gallons, cubic meters, and other volume units. 
                Perfect for cooking, engineering, and everyday measurements.
            </p>

            <div class="space-y-6">
                <div>
                    <Input
                        type="number"
                        label="Volume Value"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.001"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={volumeUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={volumeUnits}
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

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Volume References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">Everyday Volumes</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Water bottle:</span>
                                <span class="font-medium">500 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Soda can:</span>
                                <span class="font-medium">355 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Coffee cup:</span>
                                <span class="font-medium">240 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Car fuel tank:</span>
                                <span class="font-medium">60 L</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Cooking Measurements</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Teaspoon:</span>
                                <span class="font-medium">5 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Tablespoon:</span>
                                <span class="font-medium">15 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>US Cup:</span>
                                <span class="font-medium">237 mL</span>
                            </div>
                            <div class="flex justify-between">
                                <span>US Gallon:</span>
                                <span class="font-medium">3.79 L</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>