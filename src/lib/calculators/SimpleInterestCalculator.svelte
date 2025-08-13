<script>
    /**
     * Simple Interest Calculator Component
     * Calculate simple interest on loans and investments
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { calculateSimpleInterest } from "$lib/utils/calculations.js";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let principal = 10000;
    let annualRate = 5;
    let timeYears = 3;

    // Results
    let finalAmount = 0;
    let interestEarned = 0;
    let showResults = false;
    let yearlyBreakdown = [];

    // Calculate simple interest
    function calculateInterest() {
        if (principal <= 0 || annualRate < 0 || timeYears <= 0) {
            showResults = false;
            return;
        }

        const result = calculateSimpleInterest(
            principal,
            annualRate / 100,
            timeYears,
        );

        finalAmount = result.finalAmount;
        interestEarned = result.interestEarned;

        // Generate yearly breakdown
        generateYearlyBreakdown();

        showResults = true;
    }

    function generateYearlyBreakdown() {
        yearlyBreakdown = [];
        const yearlyInterest = (principal * annualRate) / 100;

        for (let year = 1; year <= Math.min(timeYears, 10); year++) {
            const totalInterest = yearlyInterest * year;
            const totalAmount = principal + totalInterest;

            yearlyBreakdown.push({
                year,
                amount: totalAmount,
                interest: totalInterest,
                yearlyInterest: yearlyInterest,
            });
        }
    }

    // Auto-calculate when inputs change
    $: if (principal && annualRate >= 0 && timeYears) {
        calculateInterest();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Simple Interest Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate simple interest on loans and investments. Simple
                interest is calculated only on the principal amount.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Principal Amount"
                    bind:value={principal}
                    placeholder="10000"
                    min="1"
                    step="100"
                />

                <Input
                    type="number"
                    label="Annual Interest Rate (%)"
                    bind:value={annualRate}
                    placeholder="5"
                    min="0"
                    max="50"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Time Period (Years)"
                    bind:value={timeYears}
                    placeholder="3"
                    min="0.1"
                    max="50"
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
                            <span class="text-gray-600">Principal Amount:</span>
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
                            <span class="text-gray-600">Interest Per Year:</span>
                            <span class="font-semibold"
                                >{formatCurrency(
                                    (principal * annualRate) / 100,
                                )}</span
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
                            <span class="text-gray-600">Total Interest:</span>
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
                            <span class="text-gray-600">Interest Type:</span>
                            <span class="font-semibold">Simple Interest</span>
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
                                        Yearly Interest
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
                                            {formatCurrency(row.yearlyInterest)}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Simple Interest Formula -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Simple Interest Formula
                </h3>

                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                    <div class="text-center text-lg font-mono">
                        I = P × r × t
                        <br />
                        A = P + I
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="space-y-2">
                        <div><strong>I</strong> = Interest earned</div>
                        <div><strong>A</strong> = Final amount</div>
                        <div><strong>P</strong> = Principal amount</div>
                    </div>
                    <div class="space-y-2">
                        <div><strong>r</strong> = Annual interest rate (decimal)</div>
                        <div><strong>t</strong> = Time in years</div>
                        <div>
                            <strong>Your calculation:</strong> I = {formatNumber(
                                principal,
                                0,
                            )} × {formatNumber(annualRate / 100, 4)} × {timeYears}
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Comparison with Compound Interest -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Simple vs Compound Interest
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📊 Simple Interest
                        </h4>
                        <p class="text-blue-800 text-sm mb-2">
                            Interest is calculated only on the principal amount.
                            Growth is linear.
                        </p>
                        <div class="text-blue-900 font-medium">
                            Your result: {formatCurrency(finalAmount)}
                        </div>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            📈 Compound Interest (Monthly)
                        </h4>
                        <p class="text-green-800 text-sm mb-2">
                            Interest is calculated on principal + accumulated
                            interest. Growth is exponential.
                        </p>
                        <div class="text-green-900 font-medium">
                            Would be: {formatCurrency(
                                calculateSimpleInterest(
                                    principal,
                                    annualRate / 100,
                                    timeYears,
                                ).finalAmount * 1.05,
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>