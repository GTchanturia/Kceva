<script>
	import {
		getFeaturedCalculators,
		getCalculatorsByCategory,
	} from "$lib/data/calculators/index.js";
	import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";
	import CalculatorCard from "$lib/components/CalculatorCard.svelte";
	import CategoryCard from "$lib/components/CategoryCard.svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import Card from "$lib/components/ui/Card.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from 'svelte';

	// Get featured calculators and categories
	$: featuredCalculators = getFeaturedCalculators().slice(0, 6);
	$: popularCategories = CALCULATOR_CATEGORIES.slice(0, 8);

	// Handle search result selection
	function handleSearchSelect(event) {
		const calculator = event.detail;
		goto(`/calculator/${calculator.id}`);
	}
	
	export let data;
	const { seo } = data;

	// Ensure proper page initialization
	onMount(() => {
		// Force a reflow to ensure styles are applied
		document.body.offsetHeight;
	});

	// Statistics
	const stats = [
		{ number: "100+", label: "Free Calculators", icon: "🧮" },
		{ number: "10", label: "Categories", icon: "📂" },
		{ number: "1M+", label: "Calculations Daily", icon: "⚡" },
		{ number: "99.9%", label: "Uptime", icon: "🚀" }
	];

	// Key features
	const features = [
		{
			title: "Lightning Fast",
			description: "Instant calculations with no loading delays. All processing happens in your browser.",
			icon: "⚡"
		},
		{
			title: "Always Free",
			description: "No subscriptions, no hidden fees, no premium tiers. All tools are completely free forever.",
			icon: "🆓"
		},
		{
			title: "Privacy First",
			description: "Your data stays on your device. We don't store, track, or share your calculations.",
			icon: "🔒"
		},
		{
			title: "Mobile Optimized",
			description: "Perfect experience on any device - desktop, tablet, or smartphone.",
			icon: "📱"
		}
	];
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:url" content={seo.url} />
	<link rel="canonical" href={seo.url} />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="relative bg-gradient-to-br from-slate-50 to-blue-50 py-16 lg:py-24 overflow-hidden">
		<!-- Background Pattern -->
		<div class="absolute inset-0 opacity-5">
			<div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0); background-size: 20px 20px;"></div>
		</div>
		
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<!-- Main Headline -->
				<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
					100+ Free Online
					<span class="text-blue-600 block">Calculators</span>
				</h1>
				
				<!-- Subtitle -->
				<p class="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
					Fast, accurate, and mobile-friendly calculators for finance, health, math, 
					unit conversion, and more. No ads, no registration required.
				</p>
				
				<!-- Search Bar -->
				<div class="max-w-md mx-auto mb-12">
					<SearchBar on:select={handleSearchSelect} />
				</div>
				
				<!-- Trust Indicators -->
				<div class="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
					<div class="flex items-center gap-2">
						<div class="w-2 h-2 bg-green-500 rounded-full"></div>
						<span>Always Free</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
						<span>Instant Results</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-2 h-2 bg-purple-500 rounded-full"></div>
						<span>Privacy Protected</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="py-12 bg-white border-b border-slate-100">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				{#each stats as stat}
					<div class="text-center">
						<div class="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
							{stat.number}
						</div>
						<div class="text-sm md:text-base text-slate-600">
							{stat.label}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Featured Calculators -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Most Popular Calculators
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Our most trusted and frequently used calculators for everyday calculations
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{#each featuredCalculators as calculator}
					<CalculatorCard {calculator} featured={true} />
				{/each}
			</div>
			
			<div class="text-center mt-12">
				<Button variant="outline" href="/categories" size="lg">
					View All 100+ Calculators
				</Button>
			</div>
		</div>
	</section>

	<!-- Categories Section -->
	<section class="py-16 lg:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Browse by Category
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Find the perfect calculator for your needs across our organized categories
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each popularCategories as category}
					<CategoryCard {category} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Why Choose kceva?
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Built with modern web standards and user experience in mind
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each features as feature}
					<Card>
						<div class="p-6 text-center h-full">
							<div class="text-4xl mb-4">{feature.icon}</div>
							<h3 class="text-xl font-semibold text-slate-900 mb-3">
								{feature.title}
							</h3>
							<p class="text-slate-600 leading-relaxed">
								{feature.description}
							</p>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 lg:py-20 bg-blue-600">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
				Ready to Start Calculating?
			</h2>
			<p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
				Join millions of users who trust kceva for accurate, fast calculations
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" href="/categories" className="bg-white text-blue-600 hover:bg-slate-50">
					Explore All Categories
				</Button>
				<Button variant="outline" size="lg" href="/education" className="border-white text-white hover:bg-white hover:text-blue-600">
					Education Resources
				</Button>
			</div>
		</div>
	</section>
</div>