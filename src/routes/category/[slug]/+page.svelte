<script>
        import { page } from "$app/stores";
        import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";
        import { getCalculatorsByCategory } from "$lib/data/calculators/index.js";
        import CalculatorCard from "$lib/components/CalculatorCard.svelte";
        import Button from "$lib/components/ui/Button.svelte";

        // Get category from URL parameter
        $: categoryId = $page.params.slug;
        $: category = CALCULATOR_CATEGORIES.find((cat) => cat.id === categoryId);
        $: calculators = category ? getCalculatorsByCategory(category.id) : [];

        // Get color classes for the category
        $: colorClasses = category
                ? {
                                emerald: "from-emerald-500 to-emerald-600",
                                blue: "from-blue-500 to-blue-600",
                                purple: "from-purple-500 to-purple-600",
                                orange: "from-orange-500 to-orange-600",
                                red: "from-red-500 to-red-600",
                                indigo: "from-indigo-500 to-indigo-600",
                                gray: "from-gray-500 to-gray-600",
                                pink: "from-pink-500 to-pink-600",
                                teal: "from-teal-500 to-teal-600",
                                yellow: "from-yellow-500 to-yellow-600",
                        }[category.color] || "from-gray-500 to-gray-600"
                : "from-gray-500 to-gray-600";
</script>

<svelte:head>
        {#if category}
                <title
                        >{category.name} - {calculators.length} Free Calculators | kceva</title
                >
                <meta
                        name="description"
                        content="{category.description} Browse {calculators.length} free calculators in the {category.name} category at kceva.com. Fast, accurate, mobile-friendly tools."
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="kceva" />
                <meta property="og:title" content="{category.name} - {calculators.length} Free Calculators | kceva" />
                <meta property="og:description" content="{category.description}" />
                <meta property="og:url" content="https://kceva.com/category/{category.id}/" />
                <meta property="og:image" content="https://kceva.com/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="{category.name} - {calculators.length} Free Calculators | kceva" />
                <meta name="twitter:description" content="{category.description}" />
                <meta
                        name="keywords"
                        content="kceva, {category.name.toLowerCase()}, calculators, free tools, online calculator, {category.name.toLowerCase()} calculator"
                />
                <link rel="canonical" href="https://kceva.com/category/{category.id}/" />

                <script type="application/ld+json">
                        {
                                "@context": "https://schema.org",
                                "@type": "CollectionPage",
                                "name": "{category.name}",
                                "description": "{category.description}",
                                "url": "https://kceva.com/category/{category.id}/",
                                "isPartOf": {
                                        "@type": "WebSite",
                                        "name": "kceva",
                                        "url": "https://kceva.com/"
                                }
                        }
                </script>
                <script type="application/ld+json">
                        {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                        {
                                                "@type": "ListItem",
                                                "position": 1,
                                                "name": "Home",
                                                "item": "https://kceva.com/"
                                        },
                                        {
                                                "@type": "ListItem",
                                                "position": 2,
                                                "name": "Categories",
                                                "item": "https://kceva.com/categories"
                                        },
                                        {
                                                "@type": "ListItem",
                                                "position": 3,
                                                "name": "{category.name}",
                                                "item": "https://kceva.com/category/{category.id}"
                                        }
                                ]
                        }
                </script>
        {:else}
                <title>Category Not Found | Kceva - Free Online Calculators</title>
        {/if}
</svelte:head>

{#if category}
        <div class="min-h-screen bg-gray-50">
                <!-- Category Header -->
                <section class="bg-gradient-to-r {colorClasses} text-white py-16">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div class="text-center">
                                        <div class="text-6xl mb-4">{category.icon}</div>
                                        <h1 class="text-4xl md:text-5xl font-bold mb-4">
                                                {category.name}
                                        </h1>
                                        <p class="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                                                {category.description}
                                        </p>
                                        <div
                                                class="flex items-center justify-center space-x-6 text-white/80"
                                        >
                                                <div class="flex items-center space-x-2">
                                                        <svg
                                                                class="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                        >
                                                                <path
                                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                        </svg>
                                                        <span
                                                                >{calculators.length} Calculator{calculators.length !==
                                                                1
                                                                        ? "s"
                                                                        : ""}</span
                                                        >
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                        <svg
                                                                class="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                        >
                                                                <path
                                                                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                                                                />
                                                        </svg>
                                                        <span>Free to Use</span>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                        <svg
                                                                class="w-5 h-5"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                        >
                                                                <path
                                                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                                                />
                                                        </svg>
                                                        <span>Mobile Friendly</span>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </section>

                <!-- Breadcrumb -->
                <section class="bg-white border-b border-gray-200 py-4">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <nav class="flex" aria-label="Breadcrumb">
                                        <ol class="flex items-center space-x-4">
                                                <li>
                                                        <a
                                                                href="/"
                                                                class="text-gray-500 hover:text-gray-700"
                                                                >Home</a
                                                                >
                                                </li>
                                                <li>
                                                        <svg
                                                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                        >
                                                                <path
                                                                        fill-rule="evenodd"
                                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                        clip-rule="evenodd"
                                                                />
                                                        </svg>
                                                </li>
                                                <li>
                                                        <a
                                                                href="/categories"
                                                                class="text-gray-500 hover:text-gray-700"
                                                                >Categories</a
                                                                >
                                                </li>
                                                <li>
                                                        <svg
                                                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                        >
                                                                <path
                                                                        fill-rule="evenodd"
                                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                        clip-rule="evenodd"
                                                                />
                                                        </svg>
                                                </li>
                                                <li>
                                                        <span class="text-gray-900 font-medium"
                                                                >{category.name}</span
                                                        >
                                                </li>
                                        </ol>
                                </nav>
                        </div>
                </section>

                <!-- Calculators Grid -->
                <section class="py-12">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {#if calculators.length > 0}
                                        <div
                                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                                {#each calculators as calculator}
                                                        <CalculatorCard {calculator} />
                                                {/each}
                                        </div>
                                {:else}
                                        <div class="text-center py-12">
                                                <div class="text-6xl mb-4">🔍</div>
                                                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                                                        No calculators found
                                                </h3>
                                                <p class="text-gray-600 mb-6">
                                                        This category doesn't have any calculators yet.
                                                        Check back soon!
                                                </p>
                                                <Button variant="primary" href="/categories">
                                                        Explore Other Calculator Categories
                                                </Button>
                                        </div>
                                {/if}
                        </div>
                </section>
        </div>
{:else}
        <!-- Category Not Found -->
        <div class="min-h-screen bg-gray-50 flex items-center justify-center">
                <div class="text-center">
                        <div class="text-6xl mb-4">❌</div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">
                                Category Not Found
                        </h1>
                        <p class="text-gray-600 mb-6">
                                The category you're looking for doesn't exist or has been moved.
                        </p>
                        <div class="space-x-4">
                                <Button variant="primary" href="/categories">
                                        Browse Categories
                                </Button>
                                <Button variant="outline" href="/">Go Home</Button>
                        </div>
                </div>
        </div>
{/if}
