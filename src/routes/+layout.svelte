<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	export let data;

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
	<title>{data?.seo?.title || "Kceva — Free Calculators"}</title>
	<meta
		name="description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on Kceva.com — finance, health, math, and more."}
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kceva.com" />
	<meta
		property="og:title"
		content={data?.seo?.title || "Kceva — Free Calculators"}
	/>
	<meta
		property="og:description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on Kceva.com — finance, health, math, and more."}
	/>
	<meta property="og:image" content={data?.seo?.image || "/og-image.png"} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content={data?.seo?.title || "Kceva — Free Calculators"}
	/>
	<meta
		name="twitter:description"
		content={data?.seo?.description ||
			"Explore 100+ free calculators on Kceva.com — finance, health, math, and more."}
	/>
	<meta name="twitter:image" content={data?.seo?.image || "/og-image.png"} />

	<!-- Favicons -->
	<link rel="icon" href="/favicon.svg" type="image/png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Kceva",
			"url": "https://kceva.com",
			"description": data?.seo?.description || "100+ free calculators online."
		})}
	</script>
</svelte:head>

<div class="min-h-screen flex flex-col" role="document">
	<Header />
	<div class="flex flex-1 bg-gray-50" role="main">
		<main
			class="flex-1 min-w-0 bg-white"
			aria-label="Calculator content area"
		>
			<slot />
		</main>
	</div>
	<Footer />
</div>
