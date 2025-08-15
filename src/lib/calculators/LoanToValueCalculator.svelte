<script>
    /**
     * Loan-to-Value Calculator Component
     * Calculate loan-to-value ratio for mortgages and loans
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let loanAmount = 320000;
    let propertyValue = 400000;

    // Results
    let ltvRatio = 0;
    let downPayment = 0;
    let equity = 0;
    let showResults = false;

    // Calculate LTV ratio
    function calculateLTV() {
        if (propertyValue <= 0 || loanAmount < 0) {
            showResults = false;
            return;
        }

        ltvRatio = (loanAmount / propertyValue) * 100;
        downPayment = propertyValue - loanAmount;
        equity = downPayment;

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (propertyValue && loanAmount >= 0) {
        calculateLTV();
    }

    // Get LTV category
    function getLTVCategory(ratio) {
        if (ratio <= 80) return { text: 'Excellent', color: 'text-green-600', description: 'No PMI required, best rates' };
        if (ratio <= 85) return { text: 'Very Good', color: 'text-blue-600', description: 'Good rates, low PMI' };
        if (ratio <= 90) return { text: 'Good', color: 'text-yellow-600', description: 'Moderate PMI required' };
        if (ratio <= 95) return { text: 'Fair', color: 'text-orange-600', description: 'Higher PMI, limited options' };
        return { text: 'High Risk', color: 'text-red-600', description: 'Very high PMI, few lenders' };
    }

    $: ltvCategory = getLTVCategory(ltvRatio);
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Loan-to-Value (LTV) Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your loan-to-value ratio to understand mortgage terms, PMI requirements, 
                and refinancing options. Lower LTV ratios typically mean better loan terms.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Loan Amount"
                    bind:value={loanAmount}
                    placeholder="320000"
                    min="0"
                    step="1000"
                />

                <Input
                    type="number"
                    label="Property Value"
                    bind:value={propertyValue}
                    placeholder="400000"
                    min="1"
                    step="1000"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- LTV Ratio Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(ltvRatio, 1)}%
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Loan-to-Value Ratio
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {ltvCategory.color} bg-opacity-10 border">
                    {ltvCategory.text}
                </div>
                <div class="text-sm text-gray-500 mt-2">
                    {ltvCategory.description}
                </div>
            </div>
        </Card>

        <!-- Financial Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(downPayment)}
                    </div>
                    <div class="text-gray-600">Down Payment</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {formatNumber((downPayment / propertyValue) * 100, 1)}% of property value
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(loanAmount)}
                    </div>
                    <div class="text-gray-600">Loan Amount</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Amount financed
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatCurrency(equity)}
                    </div>
                    <div class="text-gray-600">Initial Equity</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Your ownership stake
                    </div>
                </div>
            </Card>
        </div>

        <!-- LTV Impact -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    LTV Ratio Impact
                </h3>

                <div class="space-y-4">
                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">✅ LTV ≤ 80% (Excellent)</h4>
                        <div class="text-green-800 text-sm space-y-1">
                            <div>• No Private Mortgage Insurance (PMI) required</div>
                            <div>• Best interest rates available</div>
                            <div>• More loan program options</div>
                            <div>• Easier refinancing opportunities</div>
                        </div>
                    </div>

                    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 class="font-semibold text-yellow-900 mb-2">⚠️ LTV 80-90% (Good to Fair)</h4>
                        <div class="text-yellow-800 text-sm space-y-1">
                            <div>• PMI required (typically 0.3-1.5% annually)</div>
                            <div>• Slightly higher interest rates</div>
                            <div>• Most conventional loans still available</div>
                            <div>• Can remove PMI when LTV reaches 78%</div>
                        </div>
                    </div>

                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 class="font-semibold text-red-900 mb-2">❌ LTV &gt; 90% (High Risk)</h4>
                        <div class="text-red-800 text-sm space-y-1">
                            <div>• High PMI costs (1-2% annually)</div>
                            <div>• Limited loan options</div>
                            <div>• Higher interest rates</div>
                            <div>• May require government-backed loans (FHA, VA)</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- LTV Scenarios -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Different Down Payment Scenarios
                </h3>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Down Payment
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loan Amount
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    LTV Ratio
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    PMI Required
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each [5, 10, 15, 20, 25, 30] as downPercent}
                                {@const downAmount = propertyValue * (downPercent / 100)}
                                {@const loanAmt = propertyValue - downAmount}
                                {@const ltv = (loanAmt / propertyValue) * 100}
                                <tr class={ltv === ltvRatio ? 'bg-blue-50' : ''}>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(downAmount)} ({downPercent}%)
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatCurrency(loanAmt)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium {ltv <= 80 ? 'text-green-600' : ltv <= 90 ? 'text-yellow-600' : 'text-red-600'}">
                                        {formatNumber(ltv, 1)}%
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {ltv > 80 ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    {/if}
</div>