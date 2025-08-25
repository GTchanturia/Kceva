<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { dev } from "$app/environment";

	let { children } = $props();

	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register("/service-worker.js").then(
				(reg) => console.log("Service Worker registered ✅", reg.scope),
				(err) => console.error("Service Worker failed ❌", err),
			);
		});
	}
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
		<main
			class="flex-1 min-w-0 bg-white"
			aria-label="Calculator content area"
		>
			{@render children()}
		</main>
	</div>
	<Footer />
</div>
