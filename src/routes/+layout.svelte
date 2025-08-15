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

<div class="min-h-screen flex flex-col" role="document">
	<Header />
	<div class="flex flex-1 bg-gray-50" role="main">
		<Sidebar />
		<main
			class="flex-1 min-w-0 bg-white"
			aria-label="Calculator content area"
		>
			{@render children()}
		</main>
	</div>
	<Footer />
</div>
