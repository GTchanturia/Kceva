<script>
    /**
     * Cooking Measurement Converter Component
     * Convert between cups, ml, grams, and cooking units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'cup_us';
    let toUnit = 'ml';
    let ingredient = 'water';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Cooking units with conversion factors to ml
    const cookingUnits = [
        // Volume - US
        { value: 'tsp', label: 'Teaspoon (tsp)', factor: 4.92892, category: 'US Volume' },
        { value: 'tbsp', label: 'Tablespoon (tbsp)', factor: 14.7868, category: 'US Volume' },
        { value: 'fl_oz', label: 'Fluid Ounce (fl oz)', factor: 29.5735, category: 'US Volume' },
        { value: 'cup_us', label: 'Cup (US)', factor: 236.588, category: 'US Volume' },
        { value: 'pint_us', label: 'Pint (US)', factor: 473.176, category: 'US Volume' },
        { value: 'quart_us', label: 'Quart (US)', factor: 946.353, category: 'US Volume' },
        { value: 'gallon_us', label: 'Gallon (US)', factor: 3785.41, category: 'US Volume' },
        
        // Volume - Metric
        { value: 'ml', label: 'Milliliter (ml)', factor: 1, category: 'Metric Volume' },
        { value: 'l', label: 'Liter (l)', factor: 1000, category: 'Metric Volume' },
        
        // Volume - Imperial
        { value: 'cup_uk', label: 'Cup (Imperial)', factor: 284.131, category: 'Imperial Volume' },
        { value: 'pint_uk', label: 'Pint (Imperial)', factor: 568.261, category: 'Imperial Volume' },
        
        // Weight - Common ingredients
        { value: 'g', label: 'Gram (g)', factor: 1, category: 'Weight', isWeight: true },
        { value: 'kg', label: 'Kilogram (kg)', factor: 1000, category: 'Weight', isWeight: true },
        { value: 'oz', label: 'Ounce (oz)', factor: 28.3495, category: 'Weight', isWeight: true },
        { value: 'lb', label: 'Pound (lb)', factor: 453.592, category: 'Weight', isWeight: true }
    ];

    // Common ingredients with density (g/ml)
    const ingredients = [
        { value: 'water', label: 'Water', density: 1.0 },
        { value: 'milk', label: 'Milk', density: 1.03 },
        { value: 'flour', label: 'All-purpose Flour', density: 0.57 },
        { value: 'sugar', label: 'Granulated Sugar', density: 0.85 },
        { value: 'brown_sugar', label: 'Brown Sugar (packed)', density: 0.9 },
        { value: 'butter', label: 'Butter', density: 0.91 },
        { value: 'oil', label: 'Vegetable Oil', density: 0.92 },
        { value: 'honey', label: 'Honey', density: 1.4 },
        { value: 'salt', label: 'Table Salt', density: 1.2 },
        { value: 'rice', label: 'Uncooked Rice', density: 0.75 }
    ];

    // Convert cooking measurements
    function convertMeasurement() {
        if (inputValue === null || inputValue === undefined || inputValue <= 0) {
            showResults = false;
            return;
        }

        const fromUnitData = cookingUnits.find(unit => unit.value === fromUnit);
        const toUnitData = cookingUnits.find(unit => unit.value === toUnit);
        const ingredientData = ingredients.find(ing => ing.value === ingredient);

        if (!fromUnitData || !toUnitData || !ingredientData) {
            showResults = false;
            return;
        }

        // Handle volume to volume conversion
        if (!fromUnitData.isWeight && !toUnitData.isWeight) {
            const ml = inputValue * fromUnitData.factor;
            convertedValue = ml / toUnitData.factor;
        }
        // Handle weight to weight conversion
        else if (fromUnitData.isWeight && toUnitData.isWeight) {
            const grams = inputValue * fromUnitData.factor;
            convertedValue = grams / toUnitData.factor;
        }
        // Handle volume to weight conversion
        else if (!fromUnitData.isWeight && toUnitData.isWeight) {
            const ml = inputValue * fromUnitData.factor;
            const grams = ml * ingredientData.density;
            convertedValue = grams / toUnitData.factor;
        }
        // Handle weight to volume conversion
        else if (fromUnitData.isWeight && !toUnitData.isWeight) {
            const grams = inputValue * fromUnitData.factor;
            const ml = grams / ingredientData.density;
            convertedValue = ml / toUnitData.factor;
        }

        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertMeasurement();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit && ingredient) {
        convertMeasurement();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return cookingUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Cooking Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Cooking Measurement Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between cups, milliliters, grams, and other cooking units. 
                Accounts for ingredient density for accurate weight-to-volume conversions.
            </p>

            <div class="space-y-6">
                <!-- Value and Ingredient -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Amount"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.01"
                        min="0.01"
                    />

                    <Select
                        label="Ingredient"
                        bind:value={ingredient}
                        options={ingredients}
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={cookingUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={cookingUnits}
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
                        {formatNumber(inputValue, 3)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 3)} {toUnit}
                    </div>
                    <div class="text-lg text-gray-600">
                        of {ingredients.find(ing => ing.value === ingredient)?.label}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Cooking Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Cooking Conversions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Volume Equivalents</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 cup (US):</span>
                                <span class="font-medium">236.6 ml</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 tablespoon:</span>
                                <span class="font-medium">14.8 ml</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 teaspoon:</span>
                                <span class="font-medium">4.9 ml</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 fluid ounce:</span>
                                <span class="font-medium">29.6 ml</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Weight Equivalents</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>1 ounce:</span>
                                <span class="font-medium">28.3 grams</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 pound:</span>
                                <span class="font-medium">453.6 grams</span>
                            </div>
                            <div class="flex justify-between">
                                <span>1 kilogram:</span>
                                <span class="font-medium">2.2 pounds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>