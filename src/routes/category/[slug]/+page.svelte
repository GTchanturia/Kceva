<script>
  import CalculatorCard from '$lib/components/CalculatorCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { CATEGORY_COLORS } from '$lib/types/calculator.js';
  export let data;
  const { category, calculators, seo } = data;
  $: colors = CATEGORY_COLORS[category?.color] || CATEGORY_COLORS.gray;
</script>

<svelte:head>
  <title>{seo?.title || `${category?.name} Calculators | kceva`}</title>
  <meta name="description" content={seo?.description} />
  <link rel="canonical" href={seo?.url || `https://kceva.com/category/${category?.id}/`} />
  <meta property="og:title" content={seo?.title} />
  <meta property="og:description" content={seo?.description} />
  <meta property="og:url" content={seo?.url} />
  {#if category}
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${category.name} Calculators`,
      "description": category.description,
      "url": `https://kceva.com/category/${category.id}/`,
      "isPartOf": { "@type": "WebSite", "name": "kceva", "url": "https://kceva.com/" }
    })}</script>
    <script type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
        { "@type": "ListItem", "position": 2, "name": "Categories", "item": "https://kceva.com/categories/" },
        { "@type": "ListItem", "position": 3, "name": category.name, "item": `https://kceva.com/category/${category.id}/` }
      ]
    })}</script>
  {/if}
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <!-- Breadcrumb -->
  <nav class="text-xs text-gray-500 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-gray-900">Home</a>
    <span>/</span>
    <a href="/categories" class="hover:text-gray-900">Categories</a>
    <span>/</span>
    <span class="text-gray-900">{category?.name}</span>
  </nav>

  <!-- Header -->
  {#if category}
    <div class="flex items-start gap-4 mb-8">
      <div class="w-10 h-10 rounded-lg {colors.light} flex items-center justify-center flex-shrink-0">
        <Icon name={category.icon} size={20} className={colors.text} strokeWidth={1.5} />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{category.name}</h1>
        <p class="text-sm text-gray-500 mt-0.5">{category.description} · {calculators?.length || 0} tools</p>
      </div>
    </div>
  {/if}

  <!-- Grid -->
  {#if calculators?.length}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each calculators as calculator}
        <CalculatorCard {calculator} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-16 text-gray-500">
      <p class="text-sm">No calculators found in this category.</p>
      <a href="/categories" class="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700">Browse all categories →</a>
    </div>
  {/if}
</div>
