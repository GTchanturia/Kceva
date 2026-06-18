<script>
	import CategoryCard from '$lib/components/CategoryCard.svelte';

	export let data;
	const { categories, seo } = data;

	$: sortedCategories = [...(categories || [])].sort((a, b) => b.calculatorCount - a.calculatorCount);
</script>

<svelte:head>
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		<link rel="canonical" href={seo.url} />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="kceva" />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:url" content={seo.url} />
		<meta property="og:image" content={seo.image} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={seo.title} />
		<meta name="twitter:description" content={seo.description} />
	{/if}
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"name": "Calculator Categories",
			"description": "Browse all calculator categories at kceva.com",
			"url": "https://kceva.com/categories/"
		})}
	</script>
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
				{ "@type": "ListItem", "position": 2, "name": "Categories", "item": "https://kceva.com/categories/" }
			]
		})}
	</script>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header Section -->
	<header class="bg-white border-b border-gray-200 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Calculator Categories</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Explore our comprehensive collection of 100+ calculators and converters, organized into
				convenient categories for easy browsing.
			</p>
		</div>
	</header>

	<!-- Breadcrumb -->
	<nav class="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<ol class="flex items-center gap-2 text-sm">
				<li><a href="/" class="text-gray-500 hover:text-blue-600 transition-colors">Home</a></li>
				<li class="text-gray-400">/</li>
				<li><span class="text-gray-900 font-medium">Categories</span></li>
			</ol>
		</div>
	</nav>

	<!-- Categories Grid -->
	<main class="py-10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{#each sortedCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
		</div>
	</main>

	<!-- Stats Section -->
	<section class="py-10 bg-white border-t border-gray-100" aria-label="Category statistics">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Calculators by Category</h2>
			<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
				{#each sortedCategories.slice(0, 5) as category}
					<a
						href="/category/{category.id}"
						class="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200 group"
					>
						<div class="text-2xl mb-2" aria-hidden="true">{category.icon}</div>
						<div class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
							{category.calculatorCount}
						</div>
						<div class="text-xs text-gray-500 mt-1 leading-tight">{category.name}</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>
