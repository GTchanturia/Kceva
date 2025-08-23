<script>
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { browser } from "$app/environment";

	if (browser) {
		// Load Google Analytics
		const script = document.createElement("script");
		script.async = true;
		script.src = "https://www.googletagmanager.com/gtag/js?id=G-WN6PNY6HEQ";
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());
		gtag("config", "G-MVW56X534F");
	}
</script>

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
