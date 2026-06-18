<script>
  import Icon from '$lib/components/Icon.svelte';
  import { CATEGORY_COLORS } from '$lib/types/calculator.js';
  import { onMount } from 'svelte';

  export let data;
  const { calculator, category, seo } = data;

  $: colors = CATEGORY_COLORS[category?.color] || CATEGORY_COLORS.gray;

  let CalculatorComponent = null;
  let loadError = false;
  let loading = true;

  onMount(async () => {
    if (!calculator) { loading = false; return; }
    try {
      const map = await import('$lib/config/component-map.js');
      CalculatorComponent = map.calculatorComponents[calculator.id] ?? null;
    } catch {
      loadError = true;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{seo?.title || `${calculator?.name} | kceva`}</title>
  <meta name="description" content={seo?.description} />
  {#if seo?.keywords}<meta name="keywords" content={seo.keywords} />{/if}
  <link rel="canonical" href={seo?.url || `https://kceva.com/calculator/${calculator?.id}/`} />
  <meta property="og:title" content={seo?.title} />
  <meta property="og:description" content={seo?.description} />
  <meta property="og:url" content={seo?.url} />
  <meta property="og:image" content="https://kceva.com/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {#if calculator}
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": calculator.name,
      "description": calculator.description,
      "url": `https://kceva.com/calculator/${calculator.id}/`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@type": "Organization", "name": "kceva", "url": "https://kceva.com/" }
    })}</script>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
        { "@type": "ListItem", "position": 2, "name": category?.name ?? "Categories", "item": `https://kceva.com/category/${category?.id ?? 'finance'}/` },
        { "@type": "ListItem", "position": 3, "name": calculator.name, "item": `https://kceva.com/calculator/${calculator.id}/` }
      ]
    })}</script>
  {/if}
</svelte:head>

{#if calculator}
  <!-- Page shell rendered server-side for SEO -->
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    <!-- Breadcrumb -->
    <nav class="text-xs text-gray-500 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
      <a href="/" class="hover:text-gray-900">Home</a>
      <span>/</span>
      {#if category}
        <a href="/category/{category.id}" class="hover:text-gray-900">{category.name}</a>
        <span>/</span>
      {/if}
      <span class="text-gray-900">{calculator.name}</span>
    </nav>

    <!-- Calculator header (SSR — visible to crawlers) -->
    <header class="mb-8">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-10 h-10 rounded-lg {colors.light} flex items-center justify-center">
          <Icon name={category?.icon || 'calculator'} size={20} className={colors.text} strokeWidth={1.5} />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{calculator.name}</h1>
          <p class="text-sm text-gray-500 mt-1 leading-relaxed max-w-2xl">{calculator.description}</p>
          <div class="flex items-center gap-2 mt-2 flex-wrap">
            {#if category}
              <a href="/category/{category.id}" class="inline-flex items-center gap-1 text-xs font-medium {colors.text} {colors.light} px-2 py-0.5 rounded hover:opacity-80 transition-opacity">
                {category.name}
              </a>
            {/if}
            {#if calculator.requiresApi}
              <span class="text-xs text-orange-600 font-medium">Live data</span>
            {/if}
            <span class="text-xs text-green-600 font-medium">Free</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Calculator widget (client-side) -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {#if loading}
        <div class="flex items-center justify-center py-16 gap-3 text-gray-400">
          <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span class="text-sm">Loading calculator…</span>
        </div>
      {:else if loadError}
        <div class="text-center py-16 px-4">
          <p class="text-sm text-gray-500 mb-4">Failed to load this calculator. Please refresh the page.</p>
          <a href="/categories" class="text-sm text-blue-600 hover:text-blue-700">Browse all calculators →</a>
        </div>
      {:else if CalculatorComponent}
        <svelte:component this={CalculatorComponent} />
      {:else}
        <div class="text-center py-16 px-4">
          <p class="text-sm font-medium text-gray-900 mb-2">Coming Soon</p>
          <p class="text-sm text-gray-500 mb-4">{calculator.name} is currently under development.</p>
          {#if category}
            <a href="/category/{category.id}" class="text-sm text-blue-600 hover:text-blue-700">Explore {category.name} →</a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="max-w-lg mx-auto px-4 py-20 text-center">
    <h1 class="text-xl font-bold text-gray-900 mb-2">Calculator Not Found</h1>
    <p class="text-sm text-gray-500 mb-6">The calculator you're looking for doesn't exist.</p>
    <a href="/categories" class="text-sm text-blue-600 hover:text-blue-700">Browse all calculators →</a>
  </div>
{/if}
