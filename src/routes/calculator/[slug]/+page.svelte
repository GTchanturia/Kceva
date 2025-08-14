<script>
	import { page } from '$app/stores';
	import { getCalculatorById } from '$lib/data/calculators.js';
	import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
	import Button from '$lib/components/ui/Button.svelte';
	
	// Import calculator components
	import LoanCalculator from '$lib/calculators/LoanCalculator.svelte';
	import BMICalculator from '$lib/calculators/BMICalculator.svelte';
	import BMRCalculator from '$lib/calculators/BMRCalculator.svelte';
	import CalorieIntakeCalculator from '$lib/calculators/CalorieIntakeCalculator.svelte';
	import MortgageCalculator from '$lib/calculators/MortgageCalculator.svelte';
	import CurrencyConverter from '$lib/calculators/CurrencyConverter.svelte';
	import CompoundInterestCalculator from '$lib/calculators/CompoundInterestCalculator.svelte';
	import SimpleInterestCalculator from '$lib/calculators/SimpleInterestCalculator.svelte';
	import SavingsGoalCalculator from '$lib/calculators/SavingsGoalCalculator.svelte';
	import PercentageCalculator from '$lib/calculators/PercentageCalculator.svelte';
	import TemperatureConverter from '$lib/calculators/TemperatureConverter.svelte';
	import AgeCalculator from '$lib/calculators/AgeCalculator.svelte';
	import TipCalculator from '$lib/calculators/TipCalculator.svelte';
	import RandomPasswordGenerator from '$lib/calculators/RandomPasswordGenerator.svelte';
	import CreditCardPayoffCalculator from '$lib/calculators/CreditCardPayoffCalculator.svelte';
	import RetirementSavingsCalculator from '$lib/calculators/RetirementSavingsCalculator.svelte';
	import SalaryToHourlyCalculator from '$lib/calculators/SalaryToHourlyCalculator.svelte';
	import HourlyToSalaryCalculator from '$lib/calculators/HourlyToSalaryCalculator.svelte';
	
	// Get calculator from URL parameter
	$: calculatorId = $page.params.slug;
	$: calculator = getCalculatorById(calculatorId);
	$: category = calculator ? CALCULATOR_CATEGORIES.find(cat => cat.id === calculator.category) : null;
	
	// Component mapping
	const calculatorComponents = {
		'loan-calculator': LoanCalculator,
		'bmi-calculator': BMICalculator,
		'bmr-calculator': BMRCalculator,
		'calorie-intake': CalorieIntakeCalculator,
		'mortgage-calculator': MortgageCalculator,
		'currency-converter': CurrencyConverter,
		'compound-interest': CompoundInterestCalculator,
		'simple-interest': SimpleInterestCalculator,
		'savings-goal': SavingsGoalCalculator,
		'percentage-calculator': PercentageCalculator,
		'temperature-converter': TemperatureConverter,
		'age-calculator': AgeCalculator,
		'tip-calculator': TipCalculator,
		'random-password-generator': RandomPasswordGenerator,
		'credit-card-payoff': CreditCardPayoffCalculator,
		'retirement-savings': RetirementSavingsCalculator,
		'salary-to-hourly': SalaryToHourlyCalculator,
		'hourly-to-salary': HourlyToSalaryCalculator
		// Add more calculator components as they are created
	};
	
	$: CalculatorComponent = calculator ? calculatorComponents[calculator.id] : null;
</script>

<svelte:head>
	{#if calculator}
		<title>{calculator.name} - Kceva</title>
		<meta name="description" content="{calculator.description}. Free online calculator with instant results." />
		<meta name="keywords" content="{calculator.keywords.join(', ')}, calculator, free, online" />
	{:else}
		<title>Calculator Not Found - Kceva</title>
	{/if}
</svelte:head>

{#if calculator && CalculatorComponent}
	<div class="min-h-screen bg-gray-50">
		<!-- Calculator Header -->
		<section class="bg-white border-b border-gray-200 py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Breadcrumb -->
				<nav class="flex mb-6" aria-label="Breadcrumb">
					<ol class="flex items-center space-x-4">
						<li>
							<a href="/" class="text-gray-500 hover:text-gray-700">Home</a>
						</li>
						<li>
							<svg class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
							</svg>
						</li>
						{#if category}
							<li>
								<a href="/category/{category.id}" class="text-gray-500 hover:text-gray-700">
									{category.name}
								</a>
							</li>
							<li>
								<svg class="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
								</svg>
							</li>
						{/if}
						<li>
							<span class="text-gray-900 font-medium">{calculator.name}</span>
						</li>
					</ol>
				</nav>
				
				<!-- Calculator Info -->
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
							{calculator.icon}
						</div>
					</div>
					
					<div class="flex-1 min-w-0">
						<h1 class="text-3xl font-bold text-gray-900 mb-2">
							{calculator.name}
						</h1>
						<p class="text-lg text-gray-600 mb-4">
							{calculator.description}
						</p>
						
						<div class="flex items-center space-x-4">
							{#if category}
								<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
									{category.icon} {category.name}
								</span>
							{/if}
							
							{#if calculator.requiresApi}
								<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
									🌐 Uses Live Data
								</span>
							{/if}
							
							<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
								✅ Free to Use
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- Calculator Content -->
		<section class="py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<svelte:component this={CalculatorComponent} />
			</div>
		</section>
	</div>
{:else if calculator && !CalculatorComponent}
	<!-- Calculator exists but component not implemented yet -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center max-w-md mx-auto">
			<div class="text-6xl mb-4">🚧</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">
				Coming Soon
			</h1>
			<p class="text-gray-600 mb-6">
				The <strong>{calculator.name}</strong> is currently under development. 
				Check back soon for this calculator!
			</p>
			<div class="space-x-4">
				{#if category}
					<Button variant="primary" href="/category/{category.id}">
						Browse {category.name}
					</Button>
				{/if}
				<Button variant="outline" href="/categories">
					All Categories
				</Button>
			</div>
		</div>
	</div>
{:else}
	<!-- Calculator not found -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="text-6xl mb-4">❌</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">
				Calculator Not Found
			</h1>
			<p class="text-gray-600 mb-6">
				The calculator you're looking for doesn't exist or has been moved.
			</p>
			<div class="space-x-4">
				<Button variant="primary" href="/categories">
					Browse Calculators
				</Button>
				<Button variant="outline" href="/">
					Go Home
				</Button>
			</div>
		</div>
	</div>
{/if}