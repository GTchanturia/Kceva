<script>
	import Button from "$lib/components/ui/Button.svelte";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import { onMount } from "svelte";

	export let data;
	const { calculator, category, seo } = data;

	let CalculatorComponent = null;
	let loadError = false;

	// Dynamically import only the needed calculator component
	onMount(async () => {
		if (!calculator) return;
		try {
			const map = await import("$lib/config/component-map.js");
			CalculatorComponent = map.calculatorComponents[calculator.id] ?? null;
		} catch (e) {
			loadError = true;
		}
	});
</script>

<svelte:head>
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		{#if seo.keywords}
			<meta name="keywords" content={seo.keywords} />
		{/if}
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
		<meta name="twitter:image" content={seo.image} />
	{/if}
	{#if calculator}
		<script type="application/ld+json">{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": calculator.name,
			"description": calculator.description,
			"url": `https://kceva.com/calculator/${calculator.id}/`,
			"applicationCategory": "UtilityApplication",
			"operatingSystem": "Any",
			"browserRequirements": "Requires JavaScript. Requires HTML5.",
			"offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
			"publisher": { "@type": "Organization", "name": "kceva", "url": "https://kceva.com/" }
		})}</script>
		<script type="application/ld+json">{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
				{ "@type": "ListItem", "position": 2, "name": category?.name || "Categories", "item": `https://kceva.com/category/${category?.id || 'categories'}/` },
				{ "@type": "ListItem", "position": 3, "name": calculator.name, "item": `https://kceva.com/calculator/${calculator.id}/` }
			]
		})}</script>
	{/if}
</svelte:head>

{#if calculator}
	<div class="min-h-screen bg-gray-50">
		<!-- Calculator Header -->
		<section class="bg-white border-b border-gray-200 py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Breadcrumb -->
				<nav class="flex mb-6" aria-label="Breadcrumb">
					<ol class="flex items-center gap-2 text-sm">
						<li><a href="/" class="text-gray-500 hover:text-blue-600 transition-colors">Home</a></li>
						<li class="text-gray-400">/</li>
						{#if category}
							<li><a href="/category/{category.id}" class="text-gray-500 hover:text-blue-600 transition-colors">{category.name}</a></li>
							<li class="text-gray-400">/</li>
						{/if}
						<li><span class="text-gray-900 font-medium">{calculator.name}</span></li>
					</ol>
				</nav>

				<div class="flex items-start gap-4">
					<div class="flex-shrink-0">
						<div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl shadow-sm" aria-hidden="true">
							{calculator.icon}
						</div>
					</div>
					<div class="flex-1 min-w-0">
						<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{calculator.name}</h1>
						<p class="text-gray-600 mb-4 leading-relaxed">{calculator.description}</p>
						<div class="flex flex-wrap gap-2">
							{#if category}
								<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									<span aria-hidden="true">{category.icon}</span> {category.name}
								</span>
							{/if}
							{#if calculator.requiresApi}
								<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
									🌐 Live Data
								</span>
							{/if}
							<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
								✓ Free
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Calculator Content -->
		<section class="py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{#if loadError}
					<div class="text-center py-16">
						<div class="text-5xl mb-4">⚠️</div>
						<p class="text-gray-600 mb-6">Failed to load calculator. Please refresh the page.</p>
						<Button variant="outline" href="/categories">Browse Other Calculators</Button>
					</div>
				{:else if CalculatorComponent === null && !loadError}
					<!-- Loading skeleton -->
					<div class="max-w-4xl mx-auto">
						<div class="bg-white rounded-xl border border-gray-200 p-8 flex justify-center">
							<LoadingSpinner size="lg" message="Loading calculator..." />
						</div>
					</div>
				{:else if CalculatorComponent}
					<svelte:component this={CalculatorComponent} />
				{:else}
					<!-- Component not implemented -->
					<div class="text-center py-16 max-w-md mx-auto">
						<div class="text-6xl mb-4">🚧</div>
						<h2 class="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
						<p class="text-gray-600 mb-8">
							The <strong>{calculator.name}</strong> is currently under development.
						</p>
						<div class="flex gap-3 justify-center flex-wrap">
							{#if category}
								<Button variant="primary" href="/category/{category.id}">Explore {category.name}</Button>
							{/if}
							<Button variant="outline" href="/categories">All Categories</Button>
						</div>
					</div>
				{/if}
			</div>
		</section>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
		<div class="text-center max-w-md mx-auto">
			<div class="text-6xl mb-4">🔍</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Calculator Not Found</h1>
			<p class="text-gray-600 mb-8">The calculator you're looking for doesn't exist or has been moved.</p>
			<div class="flex gap-3 justify-center">
				<Button variant="primary" href="/categories">Explore Calculators</Button>
				<Button variant="outline" href="/">Go Home</Button>
			</div>
		</div>
	</div>
{/if}
