<script>
	import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
	import { getFeaturedCalculators } from '$lib/data/calculators.js';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import CalculatorCard from '$lib/components/CalculatorCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { goto } from '$app/navigation';
	
	// Get featured calculators
	const featuredCalculators = getFeaturedCalculators();
	
	// Handle search selection
	function handleSearchSelect(event) {
		const calculator = event.detail;
		goto(`/calculator/${calculator.id}`);
	}
</script>

<svelte:head>
	<title>Kceva - 100+ Free Online Calculators & Converters | Finance, Health, Math Tools</title>
	<meta name="description" content="Access 100+ free online calculators and converters at Kceva.com. Finance calculators, health tools, math solvers, unit converters, and more. Fast, accurate, mobile-friendly." />
	<meta name="keywords" content="Kceva, calculator, converter, finance calculator, health calculator, math calculator, unit converter, free tools, online calculator, BMI calculator, loan calculator, percentage calculator" />
	<link rel="canonical" href="https://kceva.com" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
				<span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
					100+ Calculators
				</span>
				<br />
				<span class="text-gray-700">All in One Place</span>
			</h1>
			
			<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
				From financial planning to health metrics, unit conversions to mathematical formulas - 
				find the perfect calculator for any task. Fast, accurate, and completely free.
			</p>
			
			<!-- Hero Search -->
			<div class="max-w-2xl mx-auto mb-8">
				<SearchBar on:select={handleSearchSelect} />
			</div>
			
			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<Button variant="primary" size="lg" href="/categories">
					Browse All Categories
				</Button>
				<Button variant="outline" size="lg" href="/featured">
					View Featured Tools
				</Button>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="py-12 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			<div class="text-center">
				<div class="text-3xl font-bold text-blue-600 mb-2">100+</div>
				<div class="text-gray-600">Calculators</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-green-600 mb-2">10</div>
				<div class="text-gray-600">Categories</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-purple-600 mb-2">100%</div>
				<div class="text-gray-600">Free</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-orange-600 mb-2">0</div>
				<div class="text-gray-600">Ads</div>
			</div>
		</div>
	</div>
</section>

<!-- Featured Calculators -->
<section class="py-12 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Calculators</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Our most popular and useful calculators, handpicked for everyday use
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{#each featuredCalculators as calculator}
				<CalculatorCard {calculator} featured={true} />
			{/each}
		</div>
		
		<div class="text-center">
			<Button variant="outline" href="/featured">
				View All Featured Tools
			</Button>
		</div>
	</div>
</section>

<!-- Categories Section -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Explore our comprehensive collection of calculators organized by category
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each CALCULATOR_CATEGORIES as category}
				<CategoryCard {category} />
			{/each}
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-12 bg-gradient-to-br from-indigo-50 to-blue-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose CalcHub?</h2>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">⚡</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
				<p class="text-gray-600">All calculations run instantly in your browser. No waiting, no delays.</p>
			</div>
			
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">🔒</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
				<p class="text-gray-600">Your data stays on your device. We don't store or track your calculations.</p>
			</div>
			
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">📱</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
				<p class="text-gray-600">Works perfectly on all devices - desktop, tablet, and mobile.</p>
			</div>
			
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">🎯</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Accurate Results</h3>
				<p class="text-gray-600">Thoroughly tested formulas ensure precise calculations every time.</p>
			</div>
			
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">🆓</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Completely Free</h3>
				<p class="text-gray-600">No subscriptions, no hidden fees. All tools are free to use forever.</p>
			</div>
			
			<div class="text-center p-6">
				<div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl">🔍</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Easy to Find</h3>
				<p class="text-gray-600">Powerful search and organized categories help you find the right tool quickly.</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-12 bg-blue-600">
	<div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-white mb-4">
			Ready to Calculate?
		</h2>
		<p class="text-xl text-blue-100 mb-8">
			Join thousands of users who trust Kceva for their daily calculations
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button variant="secondary" size="lg" href="/categories">
				Start Calculating Now
			</Button>
			<Button variant="outline" size="lg" href="/about" className="border-white text-white hover:bg-white hover:text-blue-600">
				Learn More
			</Button>
		</div>
	</div>
</section>
