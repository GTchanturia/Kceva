<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  import { inject } from '@vercel/analytics';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  onMount(() => {
    inject();
    injectSpeedInsights();
  });
</script>

<svelte:head>
  <!-- Default meta — overridden per-page via child svelte:head -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="theme-color" content="#2563eb" />
  <meta property="og:site_name" content="kceva" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@kceva" />

  <!-- Organization structured data -->
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "kceva",
    "url": "https://kceva.com/",
    "logo": "https://kceva.com/logo.png"
  })}</script>
</svelte:head>

<!-- Skip link for a11y -->
<a
  href="#main"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
>
  Skip to content
</a>

<div class="min-h-screen flex flex-col bg-white">
  <Header />
  <main id="main" class="flex-1">
    <slot />
  </main>
  <Footer />
</div>
