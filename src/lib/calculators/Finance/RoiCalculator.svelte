<script>
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    let initialInvestment = "";
    let finalValue = "";
    let timePeriod = "";

    let roiResult = null;
    let showResults = false;
    let errorMsg = "";

    function calculateROI() {
        errorMsg = "";

        if (!initialInvestment || !finalValue) {
            showResults = false;
            return;
        }

        const invest = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);
        const years = timePeriod ? parseFloat(timePeriod) : 0;

        if (invest <= 0 || final <= 0) {
            errorMsg = "Values must be greater than 0";
            showResults = false;
            return;
        }

        const netProfit = final - invest;
        const roi = (netProfit / invest) * 100;
        const multiple = final / invest;

        let annualizedROI = null;
        if (years > 0) {
            annualizedROI = (Math.pow(final / invest, 1 / years) - 1) * 100;
        }

        roiResult = {
            netProfit: netProfit.toFixed(2),
            roi: roi.toFixed(2),
            multiple: multiple.toFixed(2),
            annualizedROI: annualizedROI ? annualizedROI.toFixed(2) : null,
            initialInvestment: invest,
            finalValue: final,
            timePeriod: years,
        };

        showResults = true;
    }

    // ✅ trigger when ANY input changes (including timePeriod)
    let timer;
    $: if (initialInvestment && finalValue) {
        clearTimeout(timer);
        timer = setTimeout(calculateROI, 300);
    }
    $: if (timePeriod && initialInvestment && finalValue) {
        clearTimeout(timer);
        timer = setTimeout(calculateROI, 300);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- ROI Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
                📊 ROI Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your Return on Investment. Enter the values below.
            </p>

            {#if errorMsg}
                <div class="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                    ⚠️ {errorMsg}
                </div>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Initial Investment"
                    bind:value={initialInvestment}
                    required
                    min="0"
                    step="0.01"
                />

                <Input
                    type="number"
                    label="Final Value"
                    bind:value={finalValue}
                    required
                    min="0"
                    step="0.01"
                />

                <Input
                    type="number"
                    label="Time Period (years, optional)"
                    bind:value={timePeriod}
                    min="0"
                    step="0.1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && roiResult}
        <!-- ROI Summary -->
        <Card>
            <div class="p-6 text-center space-y-4">
                <div class="text-6xl">
                    {roiResult.roi >= 0 ? "📈" : "📉"}
                </div>
                <div
                    class="text-4xl font-bold {roiResult.roi >= 0
                        ? 'text-green-600'
                        : 'text-red-600'}"
                >
                    {roiResult.roi}%
                </div>
                <div class="text-gray-600 text-lg">Return on Investment</div>

                {#if roiResult.annualizedROI}
                    <div
                        class="text-2xl font-semibold {roiResult.annualizedROI >=
                        0
                            ? 'text-blue-600'
                            : 'text-red-600'}"
                    >
                        {roiResult.annualizedROI}% Annualized
                    </div>
                {/if}

                <div class="text-gray-500 text-sm">
                    {roiResult.netProfit >= 0
                        ? "✅ Profitable Investment"
                        : "❌ Loss on Investment"}
                </div>
            </div>
        </Card>

        <!-- Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-4">Investment Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600">
                            {formatNumber(roiResult.initialInvestment, 2)}
                        </div>
                        <div class="text-sm text-gray-600">Initial</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-2xl font-bold text-green-600">
                            {formatNumber(roiResult.finalValue, 2)}
                        </div>
                        <div class="text-sm text-gray-600">Final</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div
                            class="text-2xl font-bold {roiResult.netProfit >= 0
                                ? 'text-purple-600'
                                : 'text-red-600'}"
                        >
                            {formatNumber(roiResult.netProfit, 2)}
                        </div>
                        <div class="text-sm text-gray-600">Profit/Loss</div>
                    </div>

                    <div class="text-center p-4 bg-yellow-50 rounded-lg">
                        <div class="text-2xl font-bold text-yellow-600">
                            ×{roiResult.multiple}
                        </div>
                        <div class="text-sm text-gray-600">Multiple</div>
                    </div>
                </div>

                {#if roiResult.timePeriod > 0}
                    <div class="mt-6 text-center p-4 bg-orange-50 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600">
                            {roiResult.timePeriod} years
                        </div>
                        <div class="text-sm text-gray-600">
                            Investment Period
                        </div>
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Explanation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-4">How it Works</h3>
                <ul class="text-gray-600 space-y-2 list-disc ml-6">
                    <li>ROI = (Net Profit ÷ Initial Investment) × 100%</li>
                    <li>Net Profit = Final Value – Initial Investment</li>
                    <li>Multiple = Final ÷ Initial</li>
                    {#if roiResult.annualizedROI}
                        <li>Annualized ROI uses compound growth rate</li>
                    {/if}
                </ul>
                <p class="text-sm text-gray-500 mt-4">
                    Note: This is a simplified model. Actual investment returns
                    may differ due to fees, taxes, or market fluctuations.
                </p>
            </div>
        </Card>
    {/if}
</div>
