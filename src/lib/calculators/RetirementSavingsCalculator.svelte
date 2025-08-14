<script>
    /**
     * Retirement Savings Calculator Component
     * Plan retirement savings and calculate future value
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let currentAge = 30;
    let retirementAge = 65;
    let currentSavings = 50000;
    let monthlyContribution = 500;
    let annualReturn = 7;
    let inflationRate = 2.5;

    // Results
    let totalSavings = 0;
    let totalContributions = 0;
    let totalGrowth = 0;
    let monthlyIncomeNeeded = 0;
    let showResults = false;
    let yearlyProjection = [];

    // Calculate retirement savings
    function calculateRetirement() {
        if (currentAge >= retirementAge || currentAge < 18 || retirementAge > 100) {
            showResults = false;
            return;
        }

        const yearsToRetirement = retirementAge - currentAge;
        const monthsToRetirement = yearsToRetirement * 12;
        const monthlyReturn = annualReturn / 100 / 12;

        // Future value of current savings
        const futureValueCurrent = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);

        // Future value of monthly contributions
        let futureValueContributions = 0;
        if (monthlyReturn > 0) {
            futureValueContributions = monthlyContribution * 
                ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);
        } else {
            futureValueContributions = monthlyContribution * monthsToRetirement;
        }

        totalSavings = futureValueCurrent + futureValueContributions;
        totalContributions = currentSavings + (monthlyContribution * monthsToRetirement);
        totalGrowth = totalSavings - totalContributions;

        // Calculate monthly income in retirement (4% rule)
        monthlyIncomeNeeded = (totalSavings * 0.04) / 12;

        // Generate yearly projection
        generateYearlyProjection();

        showResults = true;
    }

    function generateYearlyProjection() {
        yearlyProjection = [];
        let balance = currentSavings;
        const monthlyReturn = annualReturn / 100 / 12;
        const yearsToRetirement = retirementAge - currentAge;

        for (let year = 1; year <= Math.min(yearsToRetirement, 10); year++) {
            // Calculate growth for this year
            for (let month = 0; month < 12; month++) {
                balance = balance * (1 + monthlyReturn) + monthlyContribution;
            }

            const yearlyContributions = monthlyContribution * 12;
            const totalContributionsToDate = currentSavings + (monthlyContribution * 12 * year);

            yearlyProjection.push({
                year: currentAge + year,
                balance: balance,
                yearlyContributions: yearlyContributions,
                totalContributions: totalContributionsToDate,
                growth: balance - totalContributionsToDate
            });
        }
    }

    // Auto-calculate when inputs change
    $: if (currentAge && retirementAge && currentSavings >= 0 && monthlyContribution >= 0 && annualReturn >= 0) {
        calculateRetirement();
    }

    // Calculate purchasing power with inflation
    function calculatePurchasingPower(futureAmount) {
        const yearsToRetirement = retirementAge - currentAge;
        return futureAmount / Math.pow(1 + inflationRate / 100, yearsToRetirement);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Retirement Savings Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Plan your retirement savings and see how your money will grow over time. 
                Calculate how much you'll have at retirement and what monthly income that provides.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Current Age"
                    bind:value={currentAge}
                    placeholder="30"
                    min="18"
                    max="100"
                    step="1"
                />

                <Input
                    type="number"
                    label="Retirement Age"
                    bind:value={retirementAge}
                    placeholder="65"
                    min="50"
                    max="100"
                    step="1"
                />

                <Input
                    type="number"
                    label="Current Retirement Savings"
                    bind:value={currentSavings}
                    placeholder="50000"
                    min="0"
                    step="1000"
                />

                <Input
                    type="number"
                    label="Monthly Contribution"
                    bind:value={monthlyContribution}
                    placeholder="500"
                    min="0"
                    step="50"
                />

                <Input
                    type="number"
                    label="Expected Annual Return (%)"
                    bind:value={annualReturn}
                    placeholder="7"
                    min="0"
                    max="20"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Expected Inflation Rate (%)"
                    bind:value={inflationRate}
                    placeholder="2.5"
                    min="0"
                    max="10"
                    step="0.1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(totalSavings)}
                    </div>
                    <div class="text-gray-600">Total at Retirement</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Age {retirementAge}
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(monthlyIncomeNeeded)}
                    </div>
                    <div class="text-gray-600">Monthly Income</div>
                    <div class="text-sm text-gray-500 mt-1">
                        4% withdrawal rule
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(totalGrowth)}
                    </div>
                    <div class="text-gray-600">Investment Growth</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Compound interest
                    </div>
                </div>
            </Card>
        </div>

        <!-- Retirement Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Retirement Plan Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Years to Retirement:</span>
                            <span class="font-semibold">{retirementAge - currentAge} years</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Savings:</span>
                            <span class="font-semibold">{formatCurrency(currentSavings)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Contributions:</span>
                            <span class="font-semibold">{formatCurrency(monthlyContribution)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Annual Return:</span>
                            <span class="font-semibold">{annualReturn}%</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Contributions:</span>
                            <span class="font-semibold">{formatCurrency(totalContributions)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Investment Growth:</span>
                            <span class="font-semibold text-purple-600">{formatCurrency(totalGrowth)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total at Retirement:</span>
                            <span class="font-semibold text-green-600">{formatCurrency(totalSavings)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Income (4% rule):</span>
                            <span class="font-semibold text-blue-600">{formatCurrency(monthlyIncomeNeeded)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Inflation Impact -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Inflation Impact
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-2">
                            {formatCurrency(totalSavings)}
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Future Value</div>
                        <div class="text-sm text-gray-600">
                            Nominal dollars at retirement
                        </div>
                    </div>

                    <div class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600 mb-2">
                            {formatCurrency(calculatePurchasingPower(totalSavings))}
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Today's Purchasing Power</div>
                        <div class="text-sm text-gray-600">
                            Adjusted for {inflationRate}% inflation
                        </div>
                    </div>
                </div>

                <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 class="font-semibold text-blue-900 mb-2">💡 Understanding Inflation</h4>
                    <p class="text-blue-800 text-sm">
                        Due to inflation, {formatCurrency(totalSavings)} in {retirementAge - currentAge} years 
                        will have the same purchasing power as {formatCurrency(calculatePurchasingPower(totalSavings))} today.
                    </p>
                </div>
            </div>
        </Card>

        <!-- Yearly Projection -->
        {#if yearlyProjection.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Savings Growth Projection
                        {#if retirementAge - currentAge > 10}
                            (First 10 Years)
                        {/if}
                    </h3>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Balance
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Contributions
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Investment Growth
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each yearlyProjection as row}
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.year}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                            {formatCurrency(row.balance)}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                            {formatCurrency(row.totalContributions)}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                            {formatCurrency(row.growth)}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Retirement Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Retirement Planning Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            🎯 Start Early
                        </h4>
                        <p class="text-blue-800 text-sm">
                            The power of compound interest means starting early can dramatically increase your retirement savings.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            💰 Maximize Employer Match
                        </h4>
                        <p class="text-green-800 text-sm">
                            Always contribute enough to get your full employer 401(k) match - it's free money!
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            📈 Increase Contributions
                        </h4>
                        <p class="text-purple-800 text-sm">
                            Try to increase your contribution rate by 1% each year or whenever you get a raise.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🔄 Diversify Investments
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Don't put all your eggs in one basket. Diversify across different asset classes and sectors.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>