<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	export let data;

	// Initialize Vercel Analytics and Speed Insights
	onMount(() => {
		console.log('Layout mounted successfully');
		
		// Inject Vercel Analytics
		inject();
		
		// Inject Vercel Speed Insights
		injectSpeedInsights();

		// Track page views in Google Analytics (if configured)
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('config', 'GA_MEASUREMENT_ID', {
				'page_path': window.location.pathname
			});
		}
	});

	// Track page navigation for SPA
	$: if (typeof window !== 'undefined' && window.gtag && $page.url) {
		window.gtag('config', 'GA_MEASUREMENT_ID', {
			'page_path': $page.url.pathname
		});
	}

	// Service Worker registration (only client-side)
	if (typeof window !== "undefined" && "serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register("/service-worker.js").then(
				(reg) =>
					console.log("✅ Service Worker registered:", reg.scope),
				(err) => console.error("❌ Service Worker failed:", err),
			);
		});
	}
</script>

<svelte:head>
	<title>{data?.seo?.title || "kceva — Free Calculators"}</title>
	<meta
		name="description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on kceva.com — finance, health, math, and more."}
	/>

	<!-- Canonical URL -->
	{#if data?.seo?.url}
		<link rel="canonical" href={data.seo.url} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={data?.seo?.url || "https://kceva.com/"} />
	<meta
		property="og:title"
		content={data?.seo?.title || "kceva — Free Calculators"}
	/>
	<meta
		property="og:description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on kceva.com — finance, health, math, and more."}
	/>
	<meta property="og:image" content={data?.seo?.image || "https://kceva.com/og-image.png"} />
	<meta property="og:site_name" content="kceva" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={data?.seo?.title || "kceva — Free Calculators"}
	/>
	<meta
		name="twitter:description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on kceva.com — finance, health, math, and more."}
	/>
	<meta name="twitter:image" content={data?.seo?.image || "https://kceva.com/og-image.png"} />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": data?.seo?.title || "kceva",
			"url": data?.seo?.url || "https://kceva.com/",
			"description": data?.seo?.description || "100+ free calculators online."
		})}
	</script>
</svelte:head>

<div class="min-h-screen flex flex-col bg-white" role="document">
	<Header />
	<div class="flex flex-1" role="main">
		<main
			class="flex-1 min-w-0"
			aria-label="Calculator content area"
		>
			<slot />
		</main>
	</div>
	<Footer />
</div>