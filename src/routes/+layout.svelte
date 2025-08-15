<script>
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	// Inject Vercel Speed Insights
	injectSpeedInsights();
	
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col" role="document">
	<Header />
	
	<div class="flex flex-1 bg-gray-50" role="main">
		<!-- Left Sidebar -->
		<Sidebar />
		
		<!-- Main Content -->
		<main class="flex-1 min-w-0 bg-white" role="main" aria-label="Calculator content area">
			{@render children()}
		</main>
	</div>
	
	<Footer />
</div>
