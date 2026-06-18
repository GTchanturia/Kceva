<script>
  import CalculatorCard from '$lib/components/CalculatorCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { getCalculatorsByCategory } from '$lib/data/calculators/index.js';
  export let data;
  const { seo } = data;

  const educationCalcs = getCalculatorsByCategory('education');
  const mathCalcs = getCalculatorsByCategory('math').slice(0, 6);

  const tracks = [
    { title: 'Financial Literacy', href: '/category/finance', desc: 'Loans, interest, investments, budgeting, and retirement planning.', tools: '16 tools' },
    { title: 'Mathematics', href: '/category/math', desc: 'Geometry, algebra, statistics, and number theory.', tools: '13 tools' },
    { title: 'Health & Science', href: '/category/health', desc: 'BMI, calorie, body composition, and health metrics.', tools: '13 tools' },
  ];
</script>

<svelte:head>
  <title>{seo?.title || 'Education | kceva'}</title>
  <meta name="description" content={seo?.description} />
  <link rel="canonical" href="https://kceva.com/education/" />
  <meta property="og:title" content={seo?.title} />
  <meta property="og:description" content={seo?.description} />
  <meta property="og:url" content="https://kceva.com/education/" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "kceva Education",
    "description": "Free educational resources and learning paths for finance and mathematics",
    "url": "https://kceva.com/education/"
  })}</script>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <!-- Breadcrumb -->
  <nav class="text-xs text-gray-500 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-gray-900">Home</a>
    <span>/</span>
    <span class="text-gray-900">Education</span>
  </nav>

  <!-- Header -->
  <div class="mb-10">
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Education & Learning</h1>
    <p class="text-sm text-gray-500 max-w-2xl">
      Interactive calculators and structured learning resources for students, professionals, and curious minds.
    </p>
  </div>

  <!-- Learning tracks -->
  <section class="mb-12">
    <h2 class="text-base font-semibold text-gray-900 mb-4">Learning Tracks</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {#each tracks as track}
        <a
          href={track.href}
          class="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 mb-1 transition-colors">
            {track.title}
          </h3>
          <p class="text-xs text-gray-500 leading-relaxed mb-2">{track.desc}</p>
          <span class="text-xs text-blue-600 font-medium">{track.tools} →</span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Education calculators -->
  <section class="mb-12">
    <div class="flex items-baseline justify-between mb-4">
      <h2 class="text-base font-semibold text-gray-900">Education Calculators</h2>
      <a href="/category/education" class="text-xs text-blue-600 hover:text-blue-700 font-medium">View all →</a>
    </div>
    {#if educationCalcs.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each educationCalcs as calculator}
          <CalculatorCard {calculator} />
        {/each}
      </div>
    {:else}
      <p class="text-sm text-gray-500">No education calculators found.</p>
    {/if}
  </section>

  <!-- Math -->
  <section>
    <div class="flex items-baseline justify-between mb-4">
      <h2 class="text-base font-semibold text-gray-900">Math Tools</h2>
      <a href="/category/math" class="text-xs text-blue-600 hover:text-blue-700 font-medium">View all →</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each mathCalcs as calculator}
        <CalculatorCard {calculator} />
      {/each}
    </div>
  </section>
</div>
