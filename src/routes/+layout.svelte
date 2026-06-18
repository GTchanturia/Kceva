<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	export let data;

	onMount(() => {
		// Vercel Analytics & Speed Insights
		inject();
		injectSpeedInsights();
	});
</script>

<svelte:head>
	<title>{data?.seo?.title || 'kceva — Free Calculators'}</title>
	<meta
		name="description"
		content={data?.seo?.description || 'Explore 100+ free calculators on kceva.com — finance, health, math, and more.'}
	/>
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

	{#if data?.seo?.url}
		<link rel="canonical" href={data.seo.url} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="kceva" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:url" content={data?.seo?.url || 'https://kceva.com/'} />
	<meta property="og:title" content={data?.seo?.title || 'kceva — Free Calculators'} />
	<meta property="og:description" content={data?.seo?.description || 'Explore 100+ free calculators on kceva.com — finance, health, math, and more.'} />
	<meta property="og:image" content={data?.seo?.image || 'https://kceva.com/og-image.png'} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@kceva" />
	<meta name="twitter:title" content={data?.seo?.title || 'kceva — Free Calculators'} />
	<meta name="twitter:description" content={data?.seo?.description || 'Explore 100+ free calculators on kceva.com — finance, health, math, and more.'} />
	<meta name="twitter:image" content={data?.seo?.image || 'https://kceva.com/og-image.png'} />

	<!-- Structured Data: WebSite -->
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "kceva",
		"url": "https://kceva.com/",
		"description": "100+ free online calculators and converters for finance, health, math, unit conversion, and more.",
		"potentialAction": {
			"@type": "SearchAction",
			"target": { "@type": "EntryPoint", "urlTemplate": "https://kceva.com/categories?q={search_term_string}" },
			"query-input": "required name=search_term_string"
		}
	})}</script>

	<!-- Structured Data: Organization -->
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "kceva",
		"url": "https://kceva.com/",
		"logo": "https://kceva.com/logo.png",
		"description": "Free online calculators and conversion tools for everyone"
	})}</script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
	>
		Skip to main content
	</a>
	<Header />
	<main id="main-content" class="flex-1 min-w-0">
		<slot />
	</main>
	<Footer />
</div>
