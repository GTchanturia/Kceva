<script>
    /**
     * Savings Goal Calculator Component
     * Calculate how much to save monthly to reach your financial goals
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let goalAmount = 50000;
    let currentSavings = 5000;
    let timeYears = 5;
    let annualRate = 4;
    let contributionFrequency = 12; // Monthly by default

    // Results
    let monthlyContribution = 0;
    let totalContributions = 0;
    let interestEarned = 0;
    let showResults = false;
    let yearlyBreakdown = [];

    // Contribution frequency options
    const frequencyOptions = [
        { value: 12, label: "Monthly" },
        { value: 26, label: "Bi-weekly" },
        { value: 52, label: "Weekly" },
        { value: 4, label: "Quarterly" },
        { value: 1, label: "Annually" },
    ];

    // Calculate savings goal
    function calculateSavingsGoal() {
        if (goalAmount <= 0 || timeYears <= 0 || currentSavings < 0) {
            showResults = false;
            return;
        }

        const remainingAmount = goalAmount - currentSavings;
        if (remainingAmount <= 0) {
            monthlyContribution = 0;
            totalContributions = 0;
            interestEarned = 0;
            showResults = true;
            return;
        }

        const periodsPerYear = contributionFrequency;
        const totalPeriods = timeYears * periodsPerYear;
        const periodRate = annualRate / 100 / periodsPerYear;

        // Future value of current savings
        const futureValueCurrent =
            currentSavings * Math.pow(1 + periodRate, totalPeriods);

        // Required future value from contributions
        const requiredFromContributions = goalAmount - futureValueCurrent;

        if (requiredFromContributions <= 0) {
            monthlyContribution = 0;
            totalContributions = 0;
        } else {
            // Calculate required periodic contribution using PMT formula
            if (periodRate === 0) {
                monthlyContribution = requiredFromContributions / totalPeriods;
            } else {
                monthlyContribution =
                    (requiredFromContributions * periodRate) /
                    (Math.pow(1 + periodRate, totalPeriods) - 1);
            }

            totalContributions = monthlyContribution * totalPeriods;
        }

        // Convert to monthly for display
        if (contributionFrequency !== 12) {
            monthlyContribution =
                (monthlyContribution * contributionFrequency) / 12;
        }

        interestEarned = goalAmount - currentSavings - totalContributions;

        generateYearlyBreakdown();
        showResults = true;
    }

    function generateYearlyBreakdown() {
        yearlyBreakdown = [];
        let balance = currentSavings;
        const periodsPerYear = contributionFrequency;
        const periodRate = annualRate / 100 / periodsPerYear;
        const periodContribution =
            (monthlyContribution * 12) / contributionFrequency;

        for (let year = 1; year <= Math.min(timeYears, 10); year++) {
            let yearStartBalance = balance;

            // Calculate growth for this year
            for (let period = 0; period < periodsPerYear; period++) {
                balance = balance * (1 + periodRate) + periodContribution;
            }

            const yearlyContributions = periodContribution * periodsPerYear;
            const yearlyInterest =
                balance - yearStartBalance - yearlyContributions;

            yearlyBreakdown.push({
                year,
                balance: Math.max(0, balance),
                contributions: yearlyContributions,
                interest: yearlyInterest,
                totalContributions: periodContribution * periodsPerYear * year,
            });
        }
    }

    // Auto-calculate when inputs change
    $: if (goalAmount && timeYears && currentSavings >= 0 && annualRate >= 0) {
        calculateSavingsGoal();
    }

    // Get frequency label for display
    $: frequencyLabel =
        frequencyOptions.find((opt) => opt.value === contributionFrequency)
            ?.label || "Monthly";
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Savings Goal Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate how much you need to save regularly to reach your
                financial goals. Plan for a house, vacation, emergency fund, or
                any savings target.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Savings Goal"
                    bind:value={goalAmount}
                    placeholder="50000"
                    min="1"
                    step="1000"
                />

                <Input
                    type="number"
                    label="Current Savings"
                    bind:value={currentSavings}
                    placeholder="5000"
                    min="0"
                    step="100"
                />

                <Input
                    type="number"
                    label="Time to Goal (Years)"
                    bind:value={timeYears}
                    placeholder="5"
                    min="0.1"
                    max="50"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Expected Annual Return (%)"
                    bind:value={annualRate}
                    placeholder="4"
                    min="0"
                    max="20"
                    step="0.1"
                />

                <div class="md:col-span-2">
                    <Select
                        label="Contribution Frequency"
                        bind:value={contributionFrequency}
                        options={frequencyOptions}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(monthlyContribution)}
                    </div>
                    <div class="text-gray-600">Monthly Savings Needed</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(totalContributions)}
                    </div>
                    <div class="text-gray-600">Total Contributions</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(interestEarned)}
                    </div>
                    <div class="text-gray-600">Interest Earned</div>
                </div>
            </Card>
        </div>

        <!-- Goal Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Savings Plan Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Savings Goal:</span>
                            <span class="font-semibold"
                                >{formatCurrency(goalAmount)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Savings:</span>
                            <span class="font-semibold"
                                >{formatCurrency(currentSavings)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Amount Needed:</span>
                            <span class="font-semibold"
                                >{formatCurrency(
                                    goalAmount - currentSavings,
                                )}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Time Frame:</span>
                            <span class="font-semibold">{timeYears} years</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Expected Return:</span>
                            <span class="font-semibold"
                                >{annualRate}% annually</span
                            >
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >Monthly Contribution:</span
                            >
                            <span class="font-semibold text-blue-600"
                                >{formatCurrency(monthlyContribution)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >{frequencyLabel} Contribution:</span
                            >
                            <span class="font-semibold"
                                >{formatCurrency(
                                    (monthlyContribution * 12) /
                                        contributionFrequency,
                                )}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >Total Contributions:</span
                            >
                            <span class="font-semibold text-green-600"
                                >{formatCurrency(totalContributions)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Earned:</span>
                            <span class="font-semibold text-purple-600"
                                >{formatCurrency(interestEarned)}</span
                            >
                        </div>
                        <div class="flex justify-between border-t pt-3">
                            <span class="text-gray-900 font-semibold"
                                >Final Amount:</span
                            >
                            <span class="font-bold text-green-600"
                                >{formatCurrency(goalAmount)}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Progress Visualization -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Goal Progress Breakdown
                </h3>

                <div class="space-y-4">
                    <!-- Current Savings -->
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Current Savings</span>
                            <span
                                >{formatNumber(
                                    (currentSavings / goalAmount) * 100,
                                    1,
                                )}%</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                                class="bg-green-600 h-2 rounded-full"
                                style="width: {Math.min(
                                    (currentSavings / goalAmount) * 100,
                                    100,
                                )}%"
                            ></div>
                        </div>
                    </div>

                    <!-- Future Contributions -->
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Future Contributions</span>
                            <span
                                >{formatNumber(
                                    (totalContributions / goalAmount) * 100,
                                    1,
                                )}%</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                                class="bg-blue-600 h-2 rounded-full"
                                style="width: {Math.min(
                                    (totalContributions / goalAmount) * 100,
                                    100,
                                )}%"
                            ></div>
                        </div>
                    </div>

                    <!-- Interest Growth -->
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Interest Growth</span>
                            <span
                                >{formatNumber(
                                    (interestEarned / goalAmount) * 100,
                                    1,
                                )}%</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                                class="bg-purple-600 h-2 rounded-full"
                                style="width: {Math.min(
                                    (interestEarned / goalAmount) * 100,
                                    100,
                                )}%"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Yearly Breakdown -->
        {#if yearlyBreakdown.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Year-by-Year Progress
                        {#if timeYears > 10}
                            (First 10 Years)
                        {/if}
                    </h3>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Year
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Balance
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Yearly Contributions
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Yearly Interest
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each yearlyBreakdown as row}
                                    <tr>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {row.year}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium"
                                        >
                                            {formatCurrency(row.balance)}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                        >
                                            {formatCurrency(row.contributions)}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                        >
                                            {formatCurrency(row.interest)}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                                        >
                                            {formatNumber(
                                                (row.balance / goalAmount) *
                                                    100,
                                                1,
                                            )}%
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Savings Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-blue-900 mb-2">
                            🎯 Set Realistic Goals
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Make sure your savings goal and timeline are
                            achievable based on your income and expenses.
                        </p>
                    </div>

                    <div
                        class="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-green-900 mb-2">
                            🔄 Automate Savings
                        </h4>
                        <p class="text-green-800 text-sm">
                            Set up automatic transfers to make saving effortless
                            and consistent.
                        </p>
                    </div>

                    <div
                        class="bg-purple-50 border border-purple-200 rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-purple-900 mb-2">
                            📈 Start Early
                        </h4>
                        <p class="text-purple-800 text-sm">
                            The earlier you start, the more time compound
                            interest has to work in your favor.
                        </p>
                    </div>

                    <div
                        class="bg-orange-50 border border-orange-200 rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-orange-900 mb-2">
                            💡 Review Regularly
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Review and adjust your savings plan regularly as
                            your income and goals change.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
