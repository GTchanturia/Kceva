<script>
    /**
     * Loan EMI Calculator Component
     * Calculate Equated Monthly Installments for loans
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let loanAmount = 500000;
    let annualRate = 8.5;
    let loanTenureYears = 20;

    // Results
    let emi = 0;
    let totalInterest = 0;
    let totalPayment = 0;
    let showResults = false;

    // Calculate EMI
    function calculateEMI() {
        if (loanAmount <= 0 || annualRate <= 0 || loanTenureYears <= 0) {
            showResults = false;
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = loanTenureYears * 12;

        // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
        
        emi = numerator / denominator;
        totalPayment = emi * numberOfPayments;
        totalInterest = totalPayment - loanAmount;

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (loanAmount && annualRate && loanTenureYears) {
        calculateEMI();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Loan EMI Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate Equated Monthly Installments (EMI) for home loans, personal loans, 
                and other financing options. Plan your monthly budget effectively.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Loan Amount"
                    bind:value={loanAmount}
                    placeholder="500000"
                    min="1000"
                    step="1000"
                />

                <Input
                    type="number"
                    label="Annual Interest Rate (%)"
                    bind:value={annualRate}
                    placeholder="8.5"
                    min="0.1"
                    max="50"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Loan Tenure (Years)"
                    bind:value={loanTenureYears}
                    placeholder="20"
                    min="1"
                    max="50"
                    step="1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- EMI Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatCurrency(emi)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Monthly EMI
                </div>
                <div class="text-lg text-gray-500">
                    Equated Monthly Installment
                </div>
            </div>
        </Card>

        <!-- Loan Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(loanAmount)}
                    </div>
                    <div class="text-gray-600">Principal Amount</div>
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

        <!-- Loan Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Loan Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Loan Amount:</span>
                            <span class="font-semibold">{formatCurrency(loanAmount)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Rate:</span>
                            <span class="font-semibold">{annualRate}% per annum</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Loan Tenure:</span>
                            <span class="font-semibold">{loanTenureYears} years ({loanTenureYears * 12} months)</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly EMI:</span>
                            <span class="font-semibold text-blue-600">{formatCurrency(emi)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Interest:</span>
                            <span class="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Payment:</span>
                            <span class="font-semibold">{formatCurrency(totalPayment)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- EMI Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    EMI Planning Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💡 EMI to Income Ratio
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Keep your total EMIs under 40-50% of your monthly income for 
                            comfortable repayment and financial stability.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Prepayment Benefits
                        </h4>
                        <p class="text-green-800 text-sm">
                            Making prepayments can significantly reduce your total interest burden. 
                            Even small additional payments make a big difference over time.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>