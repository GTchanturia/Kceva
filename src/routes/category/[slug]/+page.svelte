<script>
	import CalculatorCard from "$lib/components/CalculatorCard.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	export let data;
	const { category, calculators, seo } = data;

	const colorGradients = {
		emerald: "from-emerald-500 to-emerald-600",
		blue: "from-blue-500 to-blue-600",
		purple: "from-purple-500 to-purple-600",
		orange: "from-orange-500 to-orange-600",
		red: "from-red-500 to-red-600",
		indigo: "from-indigo-500 to-indigo-600",
		gray: "from-gray-500 to-gray-600",
		pink: "from-pink-500 to-pink-600",
		teal: "from-teal-500 to-teal-600",
		yellow: "from-yellow-500 to-yellow-600",
		cyan: "from-cyan-500 to-cyan-600"
	};

	$: colorClass = category ? (colorGradients[category.color] || "from-blue-500 to-blue-600") : "from-blue-500 to-blue-600";
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
	{#if category}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "CollectionPage",
				"name": category.name,
				"description": category.description,
				"url": `https://kceva.com/category/${category.id}/`,
				"isPartOf": { "@type": "WebSite", "name": "kceva", "url": "https://kceva.com/" }
			})}
		</script>
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
					{ "@type": "ListItem", "position": 2, "name": "Categories", "item": "https://kceva.com/categories/" },
					{ "@type": "ListItem", "position": 3, "name": category.name, "item": `https://kceva.com/category/${category.id}/` }
				]
			})}
		</script>
	{/if}
</svelte:head>

{#if category}
	<div class="min-h-screen bg-gray-50">
		<!-- Category Header -->
		<section class="bg-gradient-to-r {colorClass} text-white py-14">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div class="text-6xl mb-4" aria-hidden="true">{category.icon}</div>
				<h1 class="text-4xl sm:text-5xl font-bold mb-4">{category.name}</h1>
				<p class="text-xl text-white/90 mb-6 max-w-3xl mx-auto">{category.description}</p>
				<div class="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
						<span>{calculators.length} Calculator{calculators.length !== 1 ? 's' : ''}</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
						</svg>
						<span>Free to Use</span>
					</div>
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
						</svg>
						<span>Mobile Friendly</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Breadcrumb -->
		<nav class="bg-white border-b border-gray-200 py-3" aria-label="Breadcrumb">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<ol class="flex items-center gap-2 text-sm">
					<li><a href="/" class="text-gray-500 hover:text-blue-600 transition-colors">Home</a></li>
					<li class="text-gray-400">/</li>
					<li><a href="/categories" class="text-gray-500 hover:text-blue-600 transition-colors">Categories</a></li>
					<li class="text-gray-400">/</li>
					<li><span class="text-gray-900 font-medium">{category.name}</span></li>
				</ol>
			</div>
		</nav>

		<!-- Calculators Grid -->
		<section class="py-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{#if calculators.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each calculators as calculator}
							<CalculatorCard {calculator} />
						{/each}
					</div>
				{:else}
					<div class="text-center py-16">
						<div class="text-6xl mb-4">🔍</div>
						<h3 class="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
						<p class="text-gray-600 mb-8">This category doesn't have any calculators yet. Check back soon!</p>
						<Button variant="primary" href="/categories">Explore Other Categories</Button>
					</div>
				{/if}
			</div>
		</section>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
		<div class="text-center max-w-md mx-auto">
			<div class="text-6xl mb-4">🔍</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
			<p class="text-gray-600 mb-8">The category you're looking for doesn't exist or has been moved.</p>
			<div class="flex gap-3 justify-center">
				<Button variant="primary" href="/categories">Browse Categories</Button>
				<Button variant="outline" href="/">Go Home</Button>
			</div>
		</div>
	</div>
{/if}
