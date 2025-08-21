<script>
    /**
     * Compound Interest Calculator Component
     * Calculate compound interest and investment growth
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { calculateCompoundInterest } from "$lib/utils/calculations.js";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let principal = 10000;
    let annualRate = 7;
    let timeYears = 10;
    let compoundFrequency = 12;

    // Results
    let finalAmount = 0;
    let interestEarned = 0;
    let showResults = false;
    let yearlyBreakdown = [];

    // Compound frequency options
    const compoundOptions = [
        { value: 1, label: "Annually" },
        { value: 2, label: "Semi-annually" },
        { value: 4, label: "Quarterly" },
        { value: 12, label: "Monthly" },
        { value: 365, label: "Daily" },
    ];

    // Calculate compound interest
    function calculateInterest() {
        if (principal <= 0 || annualRate < 0 || timeYears <= 0) {
            showResults = false;
            return;
        }

        const result = calculateCompoundInterest(
            principal,
            annualRate / 100,
            timeYears,
            compoundFrequency,
        );

        finalAmount = result.finalAmount;
        interestEarned = result.interestEarned;

        // Generate yearly breakdown
        generateYearlyBreakdown();

        showResults = true;
    }

    function generateYearlyBreakdown() {
        yearlyBreakdown = [];
        let currentAmount = principal;

        for (let year = 1; year <= Math.min(timeYears, 10); year++) {
            const yearResult = calculateCompoundInterest(
                principal,
                annualRate / 100,
                year,
                compoundFrequency,
            );

            yearlyBreakdown.push({
                year,
                amount: yearResult.finalAmount,
                interest: yearResult.interestEarned,
                yearlyGrowth:
                    year === 1
                        ? yearResult.interestEarned
                        : yearResult.finalAmount - currentAmount,
            });

            currentAmount = yearResult.finalAmount;
        }
    }

    // Auto-calculate when inputs change
    $: if (principal && annualRate >= 0 && timeYears && compoundFrequency) {
        calculateInterest();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Compound Interest Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate how your investment will grow over time with compound
                interest. See the power of compounding!
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Initial Investment"
                    bind:value={principal}
                    placeholder="10000"
                    min="1"
                    step="100"
                />

                <Input
                    type="number"
                    label="Annual Interest Rate (%)"
                    bind:value={annualRate}
                    placeholder="7"
                    min="0"
                    max="50"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Time Period (Years)"
                    bind:value={timeYears}
                    placeholder="10"
                    min="1"
                    max="50"
                    step="1"
                />

                <Select
                    label="Compound Frequency"
                    bind:value={compoundFrequency}
                    options={compoundOptions}
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
                        {formatCurrency(finalAmount)}
                    </div>
                    <div class="text-gray-600">Final Amount</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(interestEarned)}
                    </div>
                    <div class="text-gray-600">Interest Earned</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber((interestEarned / principal) * 100, 1)}%
                    </div>
                    <div class="text-gray-600">Total Return</div>
                </div>
            </Card>
        </div>

        <!-- Investment Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Investment Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Initial Investment:</span>
                            <span class="font-semibold"
                                >{formatCurrency(principal)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Annual Interest Rate:</span>
                            <span class="font-semibold">{annualRate}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Time Period:</span>
                            <span class="font-semibold"
                                >{timeYears} years</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Compound Frequency:</span>
                            <span class="font-semibold"
                                >{compoundOptions.find(
                                    (opt) => opt.value === compoundFrequency,
                                )?.label}</span
                            >
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Final Amount:</span>
                            <span class="font-semibold text-green-600"
                                >{formatCurrency(finalAmount)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Earned:</span>
                            <span class="font-semibold text-blue-600"
                                >{formatCurrency(interestEarned)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Return:</span>
                            <span class="font-semibold text-purple-600"
                                >{formatNumber(
                                    (interestEarned / principal) * 100,
                                    1,
                                )}%</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Effective Annual Rate:</span>
                            <span class="font-semibold"
                                >{formatNumber(
                                    (Math.pow(
                                        1 + annualRate / 100 / compoundFrequency,
                                        compoundFrequency,
                                    ) -
                                        1) *
                                        100,
                                    2,
                                )}%</span
                            >
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
                        Year-by-Year Growth
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
                                        Total Interest
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Yearly Growth
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
                                            {formatCurrency(row.amount)}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                        >
                                            {formatCurrency(row.interest)}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                        >
                                            {formatCurrency(row.yearlyGrowth)}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Compound Interest Formula -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Compound Interest Formula
                </h3>

                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                    <div class="text-center text-lg font-mono">
                        A = P(1 + r/n)<sup>nt</sup>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="space-y-2">
                        <div><strong>A</strong> = Final amount</div>
                        <div><strong>P</strong> = Principal (initial investment)</div>
                        <div><strong>r</strong> = Annual interest rate (decimal)</div>
                    </div>
                    <div class="space-y-2">
                        <div><strong>n</strong> = Compound frequency per year</div>
                        <div><strong>t</strong> = Time in years</div>
                        <div>
                            <strong>Your calculation:</strong> A = {formatNumber(
                                principal,
                                0,
                            )}(1 + {formatNumber(annualRate / 100, 4)}/{compoundFrequency})<sup
                                >{compoundFrequency}×{timeYears}</sup
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Investment Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💡 Start Early
                        </h4>
                        <p class="text-blue-800 text-sm">
                            The earlier you start investing, the more time your
                            money has to compound and grow exponentially.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            📈 Frequency Matters
                        </h4>
                        <p class="text-green-800 text-sm">
                            More frequent compounding (monthly vs. annually) can
                            significantly increase your returns over time.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>