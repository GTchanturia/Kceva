<script>
	import { getFeaturedCalculators, getCalculatorsByCategory } from '$lib/data/calculators.js';
	import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
	import CalculatorCard from '$lib/components/CalculatorCard.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';

	// Get featured calculators and categories
	$: featuredCalculators = getFeaturedCalculators();
	$: popularCategories = CALCULATOR_CATEGORIES.slice(0, 6);

	// Handle search result selection
	function handleSearchSelect(event) {
		const calculator = event.detail;
		goto(`/calculator/${calculator.id}`);
	}
</script>

<svelte:head>
	<title>Kceva - 100+ Free Online Calculators & Converters</title>
	<meta name="description" content="Access 100+ free online calculators and converters for finance, health, math, unit conversion, and more. Fast, accurate, mobile-friendly tools with live currency rates including GEL (Georgian Lari)." />
	<meta name="keywords" content="calculator, converter, finance, health, math, unit conversion, free tools, online calculator, Kceva, BMI, loan, percentage, currency, GEL, Georgian Lari" />
	<link rel="canonical" href="https://kceva.com" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 lg:py-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
					100+ Free Online
					<span class="text-blue-600">Calculators</span>
				</h1>
				<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
					Fast, accurate, and mobile-friendly calculators for finance, health, math, 
					unit conversion, and more. No ads, no registration required.
				</p>
				
				<!-- Search Bar -->
				<div class="max-w-md mx-auto mb-8">
					<SearchBar on:select={handleSearchSelect} />
				</div>
				
				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button variant="primary" size="lg" href="/categories">
						Explore All Categories
					</Button>
					<Button variant="outline" size="lg" href="/calculator/currency-converter">
						Try Currency Converter
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Calculators -->
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">
					Featured Calculators
				</h2>
				<p class="text-lg text-gray-600">
					Our most popular and useful calculators
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each featuredCalculators as calculator}
					<CalculatorCard {calculator} featured={true} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Popular Categories -->
	<section class="py-16 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">
					Popular Categories
				</h2>
				<p class="text-lg text-gray-600">
					Browse calculators by category
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each popularCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
			
			<div class="text-center mt-8">
				<Button variant="outline" href="/categories">
					View All Categories
				</Button>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">
					Why Choose Kceva?
				</h2>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-2xl">⚡</span>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
					<p class="text-gray-600">
						All calculations happen instantly in your browser. No waiting, no delays.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-2xl">🆓</span>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Completely Free</h3>
					<p class="text-gray-600">
						No subscriptions, no hidden fees. All tools are free to use forever.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-2xl">📱</span>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
					<p class="text-gray-600">
						Perfect experience on desktop, tablet, and mobile devices.
					</p>
				</div>
			</div>
		</div>
	</section>
</div>