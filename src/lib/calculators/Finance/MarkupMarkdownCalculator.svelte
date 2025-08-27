<script>
    /**
     * Markup/Markdown Calculator Component
     * Calculate markup and markdown percentages for pricing
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let calculationType = "markup";
    let costPrice = 100;
    let sellingPrice = 150;
    let markupPercentage = 50;
    let markdownPercentage = 20;

    // Results
    let resultPrice = 0;
    let resultPercentage = 0;
    let profit = 0;
    let profitMargin = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: "markup", label: "Calculate Markup Percentage" },
        {
            value: "selling-from-markup",
            label: "Calculate Selling Price from Markup",
        },
        { value: "markdown", label: "Calculate Markdown Percentage" },
        {
            value: "sale-from-markdown",
            label: "Calculate Sale Price from Markdown",
        },
    ];

    // Calculate based on type
    function calculate() {
        switch (calculationType) {
            case "markup":
                if (costPrice <= 0 || sellingPrice <= 0) return;
                resultPercentage =
                    ((sellingPrice - costPrice) / costPrice) * 100;
                profit = sellingPrice - costPrice;
                profitMargin = (profit / sellingPrice) * 100;
                break;

            case "selling-from-markup":
                if (costPrice <= 0 || markupPercentage < 0) return;
                resultPrice = costPrice * (1 + markupPercentage / 100);
                profit = resultPrice - costPrice;
                profitMargin = (profit / resultPrice) * 100;
                break;

            case "markdown":
                if (costPrice <= 0 || sellingPrice <= 0) return;
                resultPercentage =
                    ((costPrice - sellingPrice) / costPrice) * 100;
                profit = sellingPrice - costPrice;
                profitMargin = profit > 0 ? (profit / sellingPrice) * 100 : 0;
                break;

            case "sale-from-markdown":
                if (costPrice <= 0 || markdownPercentage < 0) return;
                resultPrice = costPrice * (1 - markdownPercentage / 100);
                profit = resultPrice - costPrice;
                profitMargin = profit > 0 ? (profit / resultPrice) * 100 : 0;
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculate();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Markup & Markdown Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate markup and markdown percentages for pricing
                strategies. Perfect for retail, business, and sales price
                optimization.
            </p>

            <div class="space-y-6">
                <Select
                    label="What do you want to calculate?"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === "markup"}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Cost Price"
                            bind:value={costPrice}
                            placeholder="100.00"
                            min="0"
                            step="0.01"
                        />

                        <Input
                            type="number"
                            label="Selling Price"
                            bind:value={sellingPrice}
                            placeholder="150.00"
                            min="0"
                            step="0.01"
                        />
                    </div>
                {:else if calculationType === "selling-from-markup"}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Cost Price"
                            bind:value={costPrice}
                            placeholder="100.00"
                            min="0"
                            step="0.01"
                        />

                        <Input
                            type="number"
                            label="Markup Percentage (%)"
                            bind:value={markupPercentage}
                            placeholder="50"
                            min="0"
                            step="0.1"
                        />
                    </div>
                {:else if calculationType === "markdown"}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Original Price"
                            bind:value={costPrice}
                            placeholder="100.00"
                            min="0"
                            step="0.01"
                        />

                        <Input
                            type="number"
                            label="Sale Price"
                            bind:value={sellingPrice}
                            placeholder="80.00"
                            min="0"
                            step="0.01"
                        />
                    </div>
                {:else if calculationType === "sale-from-markdown"}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Original Price"
                            bind:value={costPrice}
                            placeholder="100.00"
                            min="0"
                            step="0.01"
                        />

                        <Input
                            type="number"
                            label="Markdown Percentage (%)"
                            bind:value={markdownPercentage}
                            placeholder="20"
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                {#if calculationType === "markup" || calculationType === "markdown"}
                    <div class="text-5xl font-bold text-blue-600 mb-4">
                        {formatNumber(resultPercentage, 2)}%
                    </div>
                    <div class="text-xl text-gray-600">
                        {calculationType === "markup"
                            ? "Markup Percentage"
                            : "Markdown Percentage"}
                    </div>
                {:else}
                    <div class="text-5xl font-bold text-green-600 mb-4">
                        {formatCurrency(resultPrice)}
                    </div>
                    <div class="text-xl text-gray-600">
                        {calculationType === "selling-from-markup"
                            ? "Selling Price"
                            : "Sale Price"}
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Detailed Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Pricing Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">
                                {calculationType.includes("markdown")
                                    ? "Original Price:"
                                    : "Cost Price:"}
                            </span>
                            <span class="font-semibold"
                                >{formatCurrency(costPrice)}</span
                            >
                        </div>

                        {#if calculationType === "markup" || calculationType === "markdown"}
                            <div class="flex justify-between">
                                <span class="text-gray-600">
                                    {calculationType === "markup"
                                        ? "Selling Price:"
                                        : "Sale Price:"}
                                </span>
                                <span class="font-semibold"
                                    >{formatCurrency(sellingPrice)}</span
                                >
                            </div>
                        {:else}
                            <div class="flex justify-between">
                                <span class="text-gray-600">
                                    {calculationType === "selling-from-markup"
                                        ? "Selling Price:"
                                        : "Sale Price:"}
                                </span>
                                <span class="font-semibold text-green-600"
                                    >{formatCurrency(resultPrice)}</span
                                >
                            </div>
                        {/if}

                        <div class="flex justify-between">
                            <span class="text-gray-600">
                                {calculationType.includes("markup")
                                    ? "Markup:"
                                    : "Markdown:"}
                            </span>
                            <span class="font-semibold text-blue-600">
                                {calculationType === "markup" ||
                                calculationType === "markdown"
                                    ? formatNumber(resultPercentage, 2) + "%"
                                    : (calculationType === "selling-from-markup"
                                          ? markupPercentage
                                          : markdownPercentage) + "%"}
                            </span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Profit/Loss:</span>
                            <span
                                class="font-semibold {profit >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'}"
                            >
                                {formatCurrency(profit)}
                            </span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-600">Profit Margin:</span>
                            <span
                                class="font-semibold {profitMargin >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'}"
                            >
                                {formatNumber(profitMargin, 2)}%
                            </span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-600">Dollar Amount:</span>
                            <span class="font-semibold">
                                {formatCurrency(Math.abs(profit))}
                                {profit >= 0 ? "gain" : "loss"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Pricing Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div
                            class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-blue-900 mb-2">
                                Markup Percentage
                            </h4>
                            <div class="text-blue-800 text-sm">
                                <div class="font-mono">
                                    Markup % = ((Selling Price - Cost) / Cost) ×
                                    100
                                </div>
                                <div class="mt-1">Based on cost price</div>
                            </div>
                        </div>

                        <div
                            class="p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-green-900 mb-2">
                                Selling Price from Markup
                            </h4>
                            <div class="text-green-800 text-sm">
                                <div class="font-mono">
                                    Selling Price = Cost × (1 + Markup%/100)
                                </div>
                                <div class="mt-1">Add markup to cost</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div
                            class="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-purple-900 mb-2">
                                Markdown Percentage
                            </h4>
                            <div class="text-purple-800 text-sm">
                                <div class="font-mono">
                                    Markdown % = ((Original - Sale) / Original)
                                    × 100
                                </div>
                                <div class="mt-1">Based on original price</div>
                            </div>
                        </div>

                        <div
                            class="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-orange-900 mb-2">
                                Sale Price from Markdown
                            </h4>
                            <div class="text-orange-800 text-sm">
                                <div class="font-mono">
                                    Sale Price = Original × (1 - Markdown%/100)
                                </div>
                                <div class="mt-1">
                                    Subtract markdown from original
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
