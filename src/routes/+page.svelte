<script>
	import { getFeaturedCalculators, getCalculatorsByCategory } from "$lib/data/calculators/index.js";
	import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";
	import CalculatorCard from "$lib/components/CalculatorCard.svelte";
	import CategoryCard from "$lib/components/CategoryCard.svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { goto } from "$app/navigation";

	export let data;
	const { seo } = data;

	const featuredCalculators = getFeaturedCalculators().slice(0, 6);
	const popularCategories = CALCULATOR_CATEGORIES.slice(0, 8);

	function handleSearchSelect(event) {
		const calculator = event.detail;
		goto(`/calculator/${calculator.id}`);
	}

	const stats = [
		{ number: "100+", label: "Free Calculators" },
		{ number: "10", label: "Categories" },
		{ number: "Instant", label: "Results" },
		{ number: "Free", label: "Forever" }
	];

	const features = [
		{
			title: "Lightning Fast",
			description: "Instant calculations in your browser — no server delays.",
			icon: "⚡"
		},
		{
			title: "Always Free",
			description: "No subscriptions or hidden fees. All 100+ tools are free.",
			icon: "🆓"
		},
		{
			title: "Privacy First",
			description: "Your data stays on your device. Zero tracking.",
			icon: "🔒"
		},
		{
			title: "Mobile Ready",
			description: "Perfect on desktop, tablet, or smartphone.",
			icon: "📱"
		}
	];
</script>

<svelte:head>
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		<link rel="canonical" href={seo.url} />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:image" content={seo.image} />
		<meta property="og:url" content={seo.url} />
	{/if}
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "kceva — 100+ Free Online Calculators",
		"url": "https://kceva.com/",
		"description": "100+ free online calculators and converters for finance, health, math, unit conversion, and more.",
		"isPartOf": { "@type": "WebSite", "name": "kceva", "url": "https://kceva.com/" }
	})}</script>
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "kceva Calculator Suite",
		"applicationCategory": "UtilityApplication",
		"operatingSystem": "Any",
		"offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
	})}</script>
</svelte:head>

<div class="min-h-screen bg-white">

	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-slate-50 to-white pt-14 pb-16 lg:pt-20 lg:pb-20">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">
				100+ Free Online<br />
				<span class="text-blue-600">Calculators</span>
			</h1>
			<p class="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
				Fast, accurate, mobile-friendly calculators for finance, health, math, and unit conversion.
				No ads, no sign-up required.
			</p>

			<!-- Search Bar -->
			<div class="max-w-md mx-auto mb-12">
				<SearchBar on:select={handleSearchSelect} />
			</div>

			<!-- Trust badges -->
			<div class="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
					<span>Always Free</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
					<span>Instant Results</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-violet-500 rounded-full" aria-hidden="true"></div>
					<span>Privacy Protected</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats -->
	<section class="py-10 border-y border-gray-100 bg-white" aria-label="Statistics">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
				{#each stats as stat}
					<div>
						<div class="text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
						<div class="text-sm text-slate-500">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Featured Calculators -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Most Popular Calculators</h2>
				<p class="text-slate-500 max-w-xl mx-auto">Our most trusted and frequently used tools for everyday calculations</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each featuredCalculators as calculator}
					<CalculatorCard {calculator} featured={true} />
				{/each}
			</div>
			<div class="text-center mt-10">
				<Button variant="outline" href="/categories" size="lg">View All 100+ Calculators</Button>
			</div>
		</div>
	</section>

	<!-- Categories -->
	<section class="py-16 lg:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Browse by Category</h2>
				<p class="text-slate-500 max-w-xl mx-auto">Find the perfect calculator across our organized categories</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{#each popularCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Why Choose kceva?</h2>
				<p class="text-slate-500 max-w-xl mx-auto">Built with modern web standards and user experience in mind</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each features as feature}
					<div class="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
						<div class="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
						<h3 class="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
						<p class="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-16 bg-blue-600">
		<div class="max-w-3xl mx-auto px-4 text-center">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start?</h2>
			<p class="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
				Join millions of users who trust kceva for accurate, fast calculations
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button href="/categories" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
					Explore All Categories
				</Button>
				<Button href="/education" size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
					Education Resources
				</Button>
			</div>
		</div>
	</section>

</div>
