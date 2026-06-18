<script>
  import CategoryCard from '$lib/components/CategoryCard.svelte';
  export let data;
  const { categories, seo } = data;
</script>

<svelte:head>
  <title>{seo?.title || 'Calculator Categories | kceva'}</title>
  <meta name="description" content={seo?.description} />
  <link rel="canonical" href="https://kceva.com/categories/" />
  <meta property="og:title" content={seo?.title} />
  <meta property="og:description" content={seo?.description} />
  <meta property="og:url" content="https://kceva.com/categories/" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculator Categories",
    "url": "https://kceva.com/categories/",
    "isPartOf": { "@type": "WebSite", "name": "kceva", "url": "https://kceva.com/" }
  })}</script>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <!-- Breadcrumb -->
  <nav class="text-xs text-gray-500 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-gray-900">Home</a>
    <span>/</span>
    <span class="text-gray-900">Categories</span>
  </nav>

  <!-- Page header -->
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Calculator Categories</h1>
    <p class="text-sm text-gray-500">
      {categories?.length || 0} categories · 100+ free tools
    </p>
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
    {#each categories ?? [] as category}
      <CategoryCard {category} />
    {/each}
  </div>
</div>
