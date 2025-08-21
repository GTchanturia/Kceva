<script>
    /**
     * Recipe Portion Adjuster Component
     * Scale recipe ingredients for different serving sizes
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let originalServings = 4;
    let targetServings = 6;
    let ingredients = [
        { name: 'Flour', amount: 2, unit: 'cups' },
        { name: 'Sugar', amount: 1, unit: 'cup' },
        { name: 'Eggs', amount: 3, unit: 'pieces' },
        { name: 'Milk', amount: 1.5, unit: 'cups' }
    ];

    // Results
    let scaledIngredients = [];
    let scalingFactor = 0;
    let showResults = false;

    // Calculate scaled recipe
    function calculateScaledRecipe() {
        if (originalServings <= 0 || targetServings <= 0) {
            showResults = false;
            return;
        }

        scalingFactor = targetServings / originalServings;
        
        scaledIngredients = ingredients.map(ingredient => ({
            ...ingredient,
            scaledAmount: ingredient.amount * scalingFactor
        }));

        showResults = true;
    }

    // Add ingredient
    function addIngredient() {
        ingredients = [...ingredients, { name: '', amount: 1, unit: 'cup' }];
    }

    // Remove ingredient
    function removeIngredient(index) {
        ingredients = ingredients.filter((_, i) => i !== index);
        calculateScaledRecipe();
    }

    // Auto-calculate when inputs change
    $: if (originalServings && targetServings && ingredients.length > 0) {
        calculateScaledRecipe();
    }

    // Format scaled amount for display
    function formatScaledAmount(amount) {
        if (amount < 0.125) return `${formatNumber(amount * 16, 1)} tbsp`;
        if (amount < 0.25) return `${formatNumber(amount * 16, 0)} tbsp`;
        if (amount < 1) return `${formatNumber(amount * 4, 1)} 1/4 cups`;
        return formatNumber(amount, 2);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Recipe Adjuster Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Recipe Portion Adjuster
            </h2>
            <p class="text-gray-600 mb-6">
                Scale recipe ingredients up or down for different serving sizes. 
                Perfect for cooking larger batches or adjusting family recipes.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                    type="number"
                    label="Original Servings"
                    bind:value={originalServings}
                    placeholder="4"
                    min="1"
                    step="1"
                />

                <Input
                    type="number"
                    label="Target Servings"
                    bind:value={targetServings}
                    placeholder="6"
                    min="1"
                    step="1"
                />
            </div>

            <!-- Ingredients List -->
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900">Recipe Ingredients</h3>
                
                {#each ingredients as ingredient, index}
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <Input
                            type="text"
                            label="Ingredient Name"
                            bind:value={ingredient.name}
                            placeholder="Flour"
                        />

                        <Input
                            type="number"
                            label="Amount"
                            bind:value={ingredient.amount}
                            placeholder="2"
                            min="0"
                            step="0.1"
                        />

                        <Input
                            type="text"
                            label="Unit"
                            bind:value={ingredient.unit}
                            placeholder="cups"
                        />

                        <div class="flex items-end">
                            <Button
                                variant="outline"
                                size="sm"
                                on:click={() => removeIngredient(index)}
                                className="w-full"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                {/each}

                <Button variant="outline" on:click={addIngredient}>
                    + Add Ingredient
                </Button>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Scaling Summary -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl font-bold text-green-600 mb-4">
                    ×{formatNumber(scalingFactor, 2)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Scaling Factor
                </div>
                <div class="text-lg text-gray-500">
                    {originalServings} servings → {targetServings} servings
                </div>
            </div>
        </Card>

        <!-- Scaled Recipe -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Scaled Recipe for {targetServings} Servings
                </h3>

                <div class="space-y-3">
                    {#each scaledIngredients as ingredient}
                        <div class="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <span class="font-medium text-blue-900">{ingredient.name}</span>
                            <div class="text-right">
                                <div class="text-lg font-bold text-blue-600">
                                    {formatNumber(ingredient.scaledAmount, 2)} {ingredient.unit}
                                </div>
                                <div class="text-sm text-blue-700">
                                    (was {formatNumber(ingredient.amount, 2)} {ingredient.unit})
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Cooking Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Recipe Scaling Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            ⚖️ Scaling Guidelines
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Most ingredients scale linearly, but spices and seasonings may need 
                            adjustment. Start with less and taste as you go.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🍳 Cooking Time
                        </h4>
                        <p class="text-green-800 text-sm">
                            Cooking times don't scale linearly. Larger batches may need 
                            slightly longer cooking times, but not proportionally.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>