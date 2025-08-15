<script>
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	// Inject Vercel Speed Insights
	injectSpeedInsights();
	
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	
	<main class="flex-1">
		{@render children()}
	</main>
	
	<Footer />
</div>
