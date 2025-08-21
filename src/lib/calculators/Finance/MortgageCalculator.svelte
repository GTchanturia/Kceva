<script>
    /**
     * Mortgage Calculator Component
     * Calculates mortgage payments, amortization schedule, and total costs
     */
    
    import Card from '$lib/components/ui/Card.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { calculateLoanPayment } from '$lib/utils/calculations.js';
    import { formatCurrency, formatNumber } from '$lib/utils/helpers.js';
    
    // Input values
    let homePrice = 400000;
    let downPayment = 80000;
    let annualRate = 4.5;
    let loanTermYears = 30;
    let propertyTax = 3000;
    let homeInsurance = 1200;
    let pmi = 0;
    let hoaFees = 0;
    
    // Results
    let loanAmount = 0;
    let monthlyPayment = 0;
    let totalInterest = 0;
    let totalPayment = 0;
    let monthlyPropertyTax = 0;
    let monthlyInsurance = 0;
    let monthlyPMI = 0;
    let monthlyHOA = 0;
    let totalMonthlyPayment = 0;
    let showResults = false;
    let amortizationSchedule = [];
    
    // Calculate mortgage details
    function calculateMortgage() {
        if (homePrice <= 0 || downPayment < 0 || annualRate < 0 || loanTermYears <= 0) {
            return;
        }
        
        loanAmount = homePrice - downPayment;
        if (loanAmount <= 0) {
            showResults = false;
            return;
        }
        
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = loanTermYears * 12;
        
        // Calculate monthly payment (principal + interest only)
        monthlyPayment = calculateLoanPayment(loanAmount, annualRate / 100, numberOfPayments);
        totalPayment = monthlyPayment * numberOfPayments;
        totalInterest = totalPayment - loanAmount;
        
        // Calculate additional monthly costs
        monthlyPropertyTax = propertyTax / 12;
        monthlyInsurance = homeInsurance / 12;
        monthlyPMI = pmi / 12;
        monthlyHOA = hoaFees / 12;
        
        // Total monthly payment including all costs
        totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
        
        // Generate amortization schedule (first 12 months)
        generateAmortizationSchedule(loanAmount, monthlyRate, numberOfPayments);
        
        showResults = true;
    }
    
    function generateAmortizationSchedule(loanAmount, monthlyRate, totalPayments) {
        amortizationSchedule = [];
        let remainingBalance = loanAmount;
        
        for (let month = 1; month <= Math.min(12, totalPayments); month++) {
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;
            
            amortizationSchedule.push({
                month,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, remainingBalance)
            });
        }
    }
    
    // Calculate loan-to-value ratio
    $: ltvRatio = homePrice > 0 ? ((homePrice - downPayment) / homePrice) * 100 : 0;
    
    // Auto-calculate when inputs change
    $: if (homePrice && annualRate && loanTermYears) {
        calculateMortgage();
    }
</script>

<div class="max-w-6xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Mortgage Calculator</h2>
            <p class="text-gray-600 mb-6">
                Calculate your mortgage payment including principal, interest, taxes, and insurance (PITI).
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Left Column -->
                <div class="space-y-4">
                    <Input
                        type="number"
                        label="Home Price"
                        bind:value={homePrice}
                        placeholder="400000"
                        min="1"
                        step="1000"
                    />
                    
                    <Input
                        type="number"
                        label="Down Payment"
                        bind:value={downPayment}
                        placeholder="80000"
                        min="0"
                        step="1000"
                    />
                    
                    <Input
                        type="number"
                        label="Annual Interest Rate (%)"
                        bind:value={annualRate}
                        placeholder="4.5"
                        min="0"
                        max="50"
                        step="0.1"
                    />
                    
                    <Input
                        type="number"
                        label="Loan Term (Years)"
                        bind:value={loanTermYears}
                        placeholder="30"
                        min="1"
                        max="50"
                        step="1"
                    />
                </div>
                
                <!-- Right Column -->
                <div class="space-y-4">
                    <Input
                        type="number"
                        label="Annual Property Tax"
                        bind:value={propertyTax}
                        placeholder="3000"
                        min="0"
                        step="100"
                    />
                    
                    <Input
                        type="number"
                        label="Annual Home Insurance"
                        bind:value={homeInsurance}
                        placeholder="1200"
                        min="0"
                        step="100"
                    />
                    
                    <Input
                        type="number"
                        label="Annual PMI"
                        bind:value={pmi}
                        placeholder="0"
                        min="0"
                        step="100"
                    />
                    
                    <Input
                        type="number"
                        label="Annual HOA Fees"
                        bind:value={hoaFees}
                        placeholder="0"
                        min="0"
                        step="100"
                    />
                </div>
            </div>
        </div>
    </Card>
    
    <!-- Results -->
    {#if showResults}
        <!-- Main Results Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(monthlyPayment)}
                    </div>
                    <div class="text-gray-600">Principal & Interest</div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(totalMonthlyPayment)}
                    </div>
                    <div class="text-gray-600">Total Monthly Payment</div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(totalInterest)}
                    </div>
                    <div class="text-gray-600">Total Interest</div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatNumber(ltvRatio, 1)}%
                    </div>
                    <div class="text-gray-600">Loan-to-Value</div>
                </div>
            </Card>
        </div>
        
        <!-- Monthly Payment Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Principal & Interest:</span>
                            <span class="font-semibold">{formatCurrency(monthlyPayment)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Property Tax:</span>
                            <span class="font-semibold">{formatCurrency(monthlyPropertyTax)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Home Insurance:</span>
                            <span class="font-semibold">{formatCurrency(monthlyInsurance)}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">PMI:</span>
                            <span class="font-semibold">{formatCurrency(monthlyPMI)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">HOA Fees:</span>
                            <span class="font-semibold">{formatCurrency(monthlyHOA)}</span>
                        </div>
                        <div class="flex justify-between border-t pt-3">
                            <span class="text-gray-900 font-semibold">Total Monthly Payment:</span>
                            <span class="font-bold text-blue-600">{formatCurrency(totalMonthlyPayment)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
        <!-- Mortgage Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Mortgage Summary</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Home Price:</span>
                            <span class="font-semibold">{formatCurrency(homePrice)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Down Payment:</span>
                            <span class="font-semibold">{formatCurrency(downPayment)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Loan Amount:</span>
                            <span class="font-semibold">{formatCurrency(loanAmount)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Interest Rate:</span>
                            <span class="font-semibold">{annualRate}% per year</span>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Loan Term:</span>
                            <span class="font-semibold">{loanTermYears} years ({loanTermYears * 12} payments)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total of Payments:</span>
                            <span class="font-semibold">{formatCurrency(totalPayment)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Interest:</span>
                            <span class="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Loan-to-Value Ratio:</span>
                            <span class="font-semibold">{formatNumber(ltvRatio, 1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
        <!-- Amortization Schedule Preview -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Amortization Schedule (First 12 Months)
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
                            {#each amortizationSchedule as row}
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
                
                {#if loanTermYears * 12 > 12}
                    <div class="mt-4 text-center">
                        <Button variant="outline" size="sm">
                            View Full Schedule
                        </Button>
                    </div>
                {/if}
            </div>
        </Card>
        
        <!-- Tips and Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Mortgage Tips</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">💡 Down Payment</h4>
                        <p class="text-blue-800 text-sm">
                            A larger down payment reduces your loan amount, monthly payments, and may help you avoid PMI. 
                            Aim for at least 20% to avoid private mortgage insurance.
                        </p>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">📊 LTV Ratio</h4>
                        <p class="text-green-800 text-sm">
                            Your Loan-to-Value ratio is {formatNumber(ltvRatio, 1)}%. 
                            Lower LTV ratios typically result in better interest rates and loan terms.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>