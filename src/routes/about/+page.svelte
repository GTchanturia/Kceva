<script>
  import Icon from '$lib/components/Icon.svelte';
  export let data;
  const { seo } = data;

  const principles = [
    { icon: 'lightning', title: 'No sign-up', desc: 'Every tool works immediately, no account or email required.' },
    { icon: 'shield', title: 'Privacy first', desc: 'All calculations happen in your browser. We store nothing.' },
    { icon: 'globe', title: 'Always free', desc: '100+ calculators, free forever. No paywalls, no ads in tools.' },
    { icon: 'mobile', title: 'Mobile first', desc: 'Designed to work perfectly on any device or screen size.' },
  ];

  const categories = [
    'Finance & Investment', 'Health & Fitness', 'Math & Geometry',
    'Unit Converters', 'Date & Time', 'Education', 'Tech & IT',
    'Design & Graphics', 'Lifestyle', 'Fun Tools'
  ];
</script>

<svelte:head>
  <title>{seo?.title || 'About kceva | Free Online Calculators'}</title>
  <meta name="description" content={seo?.description} />
  <link rel="canonical" href="https://kceva.com/about/" />
  <meta property="og:title" content={seo?.title} />
  <meta property="og:description" content={seo?.description} />
  <meta property="og:url" content="https://kceva.com/about/" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About kceva",
    "url": "https://kceva.com/about/",
    "description": "kceva provides 100+ free online calculators and converters for finance, health, math, and more.",
    "publisher": { "@type": "Organization", "name": "kceva", "url": "https://kceva.com/" }
  })}</script>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Breadcrumb -->
  <nav class="text-xs text-gray-500 mb-8 flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-gray-900">Home</a>
    <span>/</span>
    <span class="text-gray-900">About</span>
  </nav>

  <!-- Intro -->
  <h1 class="text-3xl font-bold text-gray-900 mb-4 tracking-tight">About kceva</h1>
  <p class="text-base text-gray-600 leading-relaxed mb-6">
    kceva is a free online calculator platform providing accurate, fast tools for everyday calculations.
    We cover finance, health, mathematics, unit conversion, and more — with no sign-up, no ads inside tools, and no data collection.
  </p>
  <p class="text-base text-gray-600 leading-relaxed mb-10">
    Whether you need to calculate a mortgage payment, convert units, check your BMI, or solve a math problem,
    kceva gives you a reliable answer in seconds.
  </p>

  <!-- Principles -->
  <h2 class="text-lg font-bold text-gray-900 mb-4">Our Principles</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
    {#each principles as p}
      <div class="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
        <div class="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center">
          <Icon name={p.icon} size={16} className="text-blue-600" strokeWidth={1.75} />
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-900">{p.title}</h3>
          <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Categories -->
  <h2 class="text-lg font-bold text-gray-900 mb-4">What We Cover</h2>
  <div class="flex flex-wrap gap-2 mb-10">
    {#each categories as cat}
      <span class="inline-block text-xs font-medium text-gray-600 bg-gray-100 rounded-md px-3 py-1.5">{cat}</span>
    {/each}
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
    {#each [['100+', 'Free tools'],['11', 'Categories'],['Zero', 'Data collected']] as [n, l]}
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{n}</div>
        <div class="text-xs text-gray-500 mt-1">{l}</div>
      </div>
    {/each}
  </div>
</div>
