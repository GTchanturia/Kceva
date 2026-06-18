<script>
  import { CALCULATOR_CATEGORIES, CATEGORY_COLORS } from '$lib/types/calculator.js';
  import { getFeaturedCalculators, getCalculatorsByCategory } from '$lib/data/calculators/index.js';
  import CalculatorCard from '$lib/components/CalculatorCard.svelte';
  import CategoryCard from '$lib/components/CategoryCard.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { goto } from '$app/navigation';

  export let data;

  const featuredCalculators = getFeaturedCalculators().slice(0, 9);
  const categoriesWithCounts = CALCULATOR_CATEGORIES.map(cat => ({
    ...cat,
    calculatorCount: getCalculatorsByCategory(cat.id).length
  }));

  function handleSearch(e) {
    goto(`/calculator/${e.detail.id}`);
  }

  const features = [
    { icon: 'lightning', title: 'Instant Results', desc: 'Client-side calculations with zero server latency.' },
    { icon: 'shield', title: 'Privacy First', desc: 'No data leaves your browser. Zero tracking.' },
    { icon: 'globe', title: 'Always Free', desc: 'Every tool, forever free. No account required.' },
    { icon: 'mobile', title: 'Mobile Ready', desc: 'Works perfectly on any screen size.' },
  ];
</script>

<svelte:head>
  <title>{data?.seo?.title || 'kceva — Free Online Calculators'}</title>
  <meta name="description" content={data?.seo?.description} />
  <link rel="canonical" href="https://kceva.com/" />
  <meta property="og:title" content={data?.seo?.title} />
  <meta property="og:description" content={data?.seo?.description} />
  <meta property="og:url" content="https://kceva.com/" />
  <meta property="og:image" content="https://kceva.com/og-image.png" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "kceva",
    "url": "https://kceva.com/",
    "description": "100+ free online calculators and converters for finance, health, math, and more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": "https://kceva.com/categories/?q={search_term_string}" },
      "query-input": "required name=search_term_string"
    }
  })}</script>
</svelte:head>

<!-- Hero -->
<section class="border-b border-gray-100 bg-gray-50 py-16 lg:py-20">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
    <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
      Free Online Calculators<br class="hidden sm:block" /> & Converters
    </h1>
    <p class="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
      100+ accurate, fast tools for finance, health, math, and unit conversion. No sign-up. No ads.
    </p>
    <div class="max-w-sm mx-auto">
      <SearchBar on:select={handleSearch} />
    </div>
  </div>
</section>

<!-- Stats bar -->
<div class="border-b border-gray-100 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-4 divide-x divide-gray-100">
      {#each [['100+','Calculators'],['11','Categories'],['Free','Always'],['Fast','Instant']] as [n, l]}
        <div class="py-4 text-center">
          <div class="text-xl font-bold text-gray-900">{n}</div>
          <div class="text-xs text-gray-500 mt-0.5">{l}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Featured calculators -->
<section class="py-12 lg:py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-baseline justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900">Popular Calculators</h2>
      <a href="/categories" class="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each featuredCalculators as calculator}
        <CalculatorCard {calculator} />
      {/each}
    </div>
  </div>
</section>

<!-- Categories -->
<section class="py-12 lg:py-16 border-t border-gray-100 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-baseline justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900">Browse by Category</h2>
      <a href="/categories" class="text-sm text-blue-600 hover:text-blue-700 font-medium">All categories →</a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {#each categoriesWithCounts as category}
        <CategoryCard {category} />
      {/each}
    </div>
  </div>
</section>

<!-- Why kceva -->
<section class="py-12 lg:py-16 border-t border-gray-100 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-xl font-bold text-gray-900 mb-6">Why kceva?</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each features as f}
        <div class="bg-gray-50 rounded-lg p-5 border border-gray-100">
          <div class="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center mb-3">
            <Icon name={f.icon} size={16} className="text-blue-600" strokeWidth={1.75} />
          </div>
          <h3 class="text-sm font-semibold text-gray-900 mb-1">{f.title}</h3>
          <p class="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
