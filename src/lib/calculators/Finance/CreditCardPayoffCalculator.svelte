<script>
    /**
     * Credit Card Payoff Calculator Component
     * Calculate time and interest to pay off credit card debt
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let balance = 5000;
    let annualRate = 18.99;
    let monthlyPayment = 150;
    let paymentStrategy = 'fixed';

    // Results
    let payoffTime = 0;
    let totalInterest = 0;
    let totalPayment = 0;
    let showResults = false;
    let paymentSchedule = [];

    // Payment strategy options
    const strategyOptions = [
        { value: 'fixed', label: 'Fixed Monthly Payment' },
        { value: 'minimum', label: 'Minimum Payment (2% of balance)' },
        { value: 'payoff', label: 'Pay off in specific time' }
    ];

    // Calculate payoff details
    function calculatePayoff() {
        if (balance <= 0 || annualRate < 0 || monthlyPayment <= 0) {
            showResults = false;
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        let remainingBalance = balance;
        let totalInterestPaid = 0;
        let months = 0;
        paymentSchedule = [];

        // Calculate minimum payment if needed
        let payment = monthlyPayment;
        if (paymentStrategy === 'minimum') {
            payment = Math.max(remainingBalance * 0.02, 25); // 2% minimum or $25
        }

        while (remainingBalance > 0.01 && months < 600) { // Max 50 years
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = Math.min(payment - interestPayment, remainingBalance);
            
            if (principalPayment <= 0) {
                // Payment too low to cover interest
                showResults = false;
                return;
            }

            remainingBalance -= principalPayment;
            totalInterestPaid += interestPayment;
            months++;

            // Store first 12 months for display
            if (months <= 12) {
                paymentSchedule.push({
                    month: months,
                    payment: Math.min(payment, principalPayment + interestPayment),
                    principal: principalPayment,
                    interest: interestPayment,
                    balance: Math.max(0, remainingBalance)
                });
            }

            // Adjust payment for minimum strategy
            if (paymentStrategy === 'minimum') {
                payment = Math.max(remainingBalance * 0.02, 25);
            }
        }

        payoffTime = months;
        totalInterest = totalInterestPaid;
        totalPayment = balance + totalInterest;
        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (balance && annualRate >= 0 && monthlyPayment) {
        calculatePayoff();
    }

    // Format time display
    function formatPayoffTime(months) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years === 0) {
            return `${months} months`;
        } else if (remainingMonths === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
        } else {
            return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Credit Card Payoff Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate how long it will take to pay off your credit card debt and how much interest you'll pay.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Current Balance"
                    bind:value={balance}
                    placeholder="5000"
                    min="1"
                    step="100"
                />

                <Input
                    type="number"
                    label="Annual Interest Rate (%)"
                    bind:value={annualRate}
                    placeholder="18.99"
                    min="0"
                    max="50"
                    step="0.01"
                />

                <Input
                    type="number"
                    label="Monthly Payment"
                    bind:value={monthlyPayment}
                    placeholder="150"
                    min="1"
                    step="10"
                />

                <Select
                    label="Payment Strategy"
                    bind:value={paymentStrategy}
                    options={strategyOptions}
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
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatPayoffTime(payoffTime)}
                    </div>
                    <div class="text-gray-600">Payoff Time</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">
                        {formatCurrency(totalInterest)}
                    </div>
                    <div class="text-gray-600">Total Interest</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(totalPayment)}
                    </div>
                    <div class="text-gray-600">Total Payment</div>
                </div>
            </Card>
        </div>

        <!-- Payoff Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Payoff Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Balance:</span>
                            <span class="font-semibold">{formatCurrency(balance)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Rate:</span>
                            <span class="font-semibold">{annualRate}% APR</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Payment:</span>
                            <span class="font-semibold">{formatCurrency(monthlyPayment)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Payoff Time:</span>
                            <span class="font-semibold">{formatPayoffTime(payoffTime)}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Interest:</span>
                            <span class="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Payment:</span>
                            <span class="font-semibold">{formatCurrency(totalPayment)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest as % of Balance:</span>
                            <span class="font-semibold">{formatNumber((totalInterest / balance) * 100, 1)}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Interest Rate:</span>
                            <span class="font-semibold">{formatNumber(annualRate / 12, 2)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Payment Schedule Preview -->
        {#if paymentSchedule.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Payment Schedule (First 12 Months)
                    </h3>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Month
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Principal
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Interest
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {#each paymentSchedule as row}
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.month}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(row.payment)}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                            {formatCurrency(row.principal)}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                            {formatCurrency(row.interest)}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(row.balance)}
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
                    Debt Payoff Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💡 Pay More Than Minimum
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Even small extra payments can significantly reduce your payoff time and total interest paid.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Target High-Interest Debt
                        </h4>
                        <p class="text-green-800 text-sm">
                            Focus on paying off high-interest credit cards first while making minimum payments on others.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            📊 Consider Balance Transfer
                        </h4>
                        <p class="text-purple-800 text-sm">
                            A 0% APR balance transfer card could save you money if you qualify and can pay it off during the promotional period.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            ⚠️ Avoid New Debt
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Stop using the credit card while paying it off to avoid adding to your debt burden.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>