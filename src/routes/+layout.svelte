<script>
	import "../app.css";
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
	import Header from "$lib/components/Header.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { dev } from "$app/environment";

	// Note: Removed @vercel/analytics import to isolate the issue
	// Re-add once the children error is resolved
	// import { inject } from "@vercel/analytics";
	// inject({ mode: dev ? "development" : "production" });

	let { children } = $props();
</script>

<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:title" content="Kceva — 100+ Free Calculators" />
<meta
	property="og:description"
	content="Explore over 100+ free calculators on Kceva.com — finance, health, math, and more."
/>

<div class="min-h-screen flex flex-col" role="document">
	<Header />
	<div class="flex flex-1 bg-gray-50" role="main">
		<!-- <Sidebar /> -->
		<main
			class="flex-1 min-w-0 bg-white"
			aria-label="Calculator content area"
		>
			{@render children()}
		</main>
	</div>
	<Footer />
</div>
