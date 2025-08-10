<script>
	/**
	 * Loan Calculator Component
	 * Calculates monthly payments, total interest, and amortization schedule
	 */
	
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { calculateLoanPayment } from '$lib/utils/calculations.js';
	import { formatCurrency, formatNumber } from '$lib/utils/helpers.js';
	
	// Input values
	let principal = 250000;
	let annualRate = 4.5;
	let loanTermYears = 30;
	
	// Results
	let monthlyPayment = 0;
	let totalInterest = 0;
	let totalPayment = 0;
	let showResults = false;
	let amortizationSchedule = [];
	
	// Calculate loan details
	function calculateLoan() {
		if (principal <= 0 || annualRate < 0 || loanTermYears <= 0) {
			return;
		}
		
		const monthlyRate = annualRate / 100 / 12;
		const numberOfPayments = loanTermYears * 12;
		
		// Calculate monthly payment
		monthlyPayment = calculateLoanPayment(principal, annualRate / 100, numberOfPayments);
		totalPayment = monthlyPayment * numberOfPayments;
		totalInterest = totalPayment - principal;
		
		// Generate amortization schedule (first 12 months)
		generateAmortizationSchedule(principal, monthlyRate, numberOfPayments);
		
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
	
	// Auto-calculate when inputs change
	$: if (principal && annualRate && loanTermYears) {
		calculateLoan();
	}
</script>

<div class="max-w-4xl mx-auto space-y-6">
	<!-- Calculator Input -->
	<Card>
		<div class="p-6">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Loan Calculator</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Input
					type="number"
					label="Loan Amount"
					bind:value={principal}
					placeholder="250000"
					min="1"
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
		</div>
	</Card>
	
	<!-- Results -->
	{#if showResults}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<Card>
				<div class="p-6 text-center">
					<div class="text-3xl font-bold text-blue-600 mb-2">
						{formatCurrency(monthlyPayment)}
					</div>
					<div class="text-gray-600">Monthly Payment</div>
				</div>
			</Card>
			
			<Card>
				<div class="p-6 text-center">
					<div class="text-3xl font-bold text-green-600 mb-2">
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
		
		<!-- Loan Summary -->
		<Card>
			<div class="p-6">
				<h3 class="text-xl font-semibold text-gray-900 mb-4">Loan Summary</h3>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="space-y-3">
						<div class="flex justify-between">
							<span class="text-gray-600">Loan Amount:</span>
							<span class="font-semibold">{formatCurrency(principal)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Interest Rate:</span>
							<span class="font-semibold">{annualRate}% per year</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Loan Term:</span>
							<span class="font-semibold">{loanTermYears} years ({loanTermYears * 12} payments)</span>
						</div>
					</div>
					
					<div class="space-y-3">
						<div class="flex justify-between">
							<span class="text-gray-600">Monthly Payment:</span>
							<span class="font-semibold text-blue-600">{formatCurrency(monthlyPayment)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Total Interest:</span>
							<span class="font-semibold text-red-600">{formatCurrency(totalInterest)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Total of Payments:</span>
							<span class="font-semibold">{formatCurrency(totalPayment)}</span>
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
	{/if}
</div>