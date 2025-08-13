<script>
	import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
	import { getCalculatorsByCategory } from '$lib/data/calculators.js';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import CalculatorCard from '$lib/components/CalculatorCard.svelte';
	
	// Get all categories with calculator counts
	$: categoriesWithCounts = CALCULATOR_CATEGORIES.map(category => ({
		...category,
		calculatorCount: getCalculatorsByCategory(category.id).length
	}));
	
	// Sort categories by calculator count (descending)
	$: sortedCategories = categoriesWithCounts.sort((a, b) => b.calculatorCount - a.calculatorCount);
</script>

<svelte:head>
	<title>Calculator Categories - Kceva</title>
	<meta name="description" content="Browse all calculator categories including finance, health, math, unit conversion, and more. Find the perfect tool for your needs." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header Section -->
	<section class="bg-white border-b border-gray-200 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">
					Calculator Categories
				</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					Explore our comprehensive collection of 100+ calculators and converters, 
					organized into 10 convenient categories for easy browsing.
				</p>
			</div>
		</div>
	</section>
	
	<!-- Categories Grid -->
	<section class="py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each sortedCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Quick Stats -->
	<section class="py-12 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">
					Calculator Statistics
				</h2>
			</div>
			
			<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
				{#each sortedCategories.slice(0, 5) as category}
					<div class="text-center p-4 bg-gray-50 rounded-lg">
						<div class="text-2xl mb-2">{category.icon}</div>
						<div class="text-lg font-semibold text-gray-900">{category.calculatorCount}</div>
						<div class="text-sm text-gray-600">{category.name}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>