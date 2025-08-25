<script>
	import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
	import { getCalculatorsByCategory } from '$lib/data/calculators/index.js';
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
	<title>Calculator Categories - Browse 100+ Free Tools | Kceva</title>
	<meta name="description" content="Browse all calculator categories at Kceva.com including finance, health, math, unit conversion, and more. Find the perfect free calculator tool for your needs." />
	<meta name="keywords" content="Kceva, calculator categories, finance calculators, health tools, math calculators, unit converters, free online tools" />
	<link rel="canonical" href="https://kceva.com/categories" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"name": "Calculator Categories",
			"description": "Browse all calculator categories at Kceva.com including finance, health, math, unit conversion, and more.",
			"url": "https://kceva.com/categories"
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://kceva.com/"
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Categories",
					"item": "https://kceva.com/categories"
				}
			]
		}
	</script>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header Section -->
	<header class="bg-white border-b border-gray-200 py-8 lg:py-12">
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
	</header>
	
	<!-- Categories Grid -->
	<main class="py-8 lg:py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
				{#each sortedCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
		</div>
	</main>
	
	<!-- Quick Stats -->
	<section class="py-8 lg:py-12 bg-white" aria-label="Calculator statistics by category">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<header class="text-center mb-6 lg:mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">
					Calculator Statistics
				</h2>
			</header>
			
			<div class="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
				{#each sortedCategories.slice(0, 5) as category}
					<div class="text-center p-3 lg:p-4 bg-gray-50 rounded-lg" role="group" aria-label="{category.name} category statistics">
						<div class="text-2xl mb-2">{category.icon}</div>
						<div class="text-lg font-bold text-gray-900">{category.calculatorCount}</div>
						<div class="text-sm text-gray-600">{category.name}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>