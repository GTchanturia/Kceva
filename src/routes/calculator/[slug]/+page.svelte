<script>
	import { page } from "$app/stores";
	import { getCalculatorById } from "$lib/data/calculators/index.js";
	import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";
	import Button from "$lib/components/ui/Button.svelte";
	import { calculatorComponents } from "$lib/config/component-map.js";
	// Get calculator from URL parameter
	$: calculatorId = $page.params.slug;
	$: calculator = getCalculatorById(calculatorId);
	$: category = calculator
		? CALCULATOR_CATEGORIES.find((cat) => cat.id === calculator.category)
		: null;

	// Component mapping moved to $lib/config/component-map.js
	$: CalculatorComponent = calculator
		? calculatorComponents[calculator.id]
		: null;
</script>

<svelte:head>
	{#if calculator}
		<title>{calculator.name} - Free Online Calculator | kceva</title>
		<meta
			name="description"
			content="{calculator.description} Use our free {calculator.name.toLowerCase()} at kceva.com. Get instant, accurate results. Fast, mobile-friendly, and completely free."
		/>
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="kceva" />
		<meta property="og:title" content="{calculator.name} - Free Online Calculator | kceva" />
		<meta property="og:description" content="{calculator.description}" />
		<meta property="og:url" content="https://kceva.com/calculator/{calculator.id}/" />
		<meta property="og:image" content="https://kceva.com/og-image.png" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="{calculator.name} - Free Online Calculator | kceva" />
		<meta name="twitter:description" content="{calculator.description}" />
		<meta
			name="keywords"
			content="kceva, {calculator.keywords.join(
				', ',
			)}, calculator, free, online, {calculator.name.toLowerCase()}, free calculator tool"
		/>
		<link
			rel="canonical"
			href="https://kceva.com/calculator/{calculator.id}/"
		/>

		<!-- Structured Data for Calculator -->
		<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "WebApplication",
				"name": "{calculator.name}",
				"description": "{calculator.description}",
				"url": "https://kceva.com/calculator/{calculator.id}",
				"applicationCategory": "UtilityApplication",
				"operatingSystem": "Any",
				"publisher": {
					"@type": "Organization",
					"name": "Kceva",
					"url": "https://kceva.com"
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
						"name": "{category ? category.name : 'Category'}",
						"item": "https://kceva.com/category/{category ? category.id : ''}"
					},
					{
						"@type": "ListItem",
						"position": 3,
						"name": "{calculator.name}",
						"item": "https://kceva.com/calculator/{calculator.id}"
					}
				]
			}
		</script>
	{:else}
		<title>Calculator Not Found | Kceva - Free Online Calculators</title>
	{/if}
</svelte:head>

{#if calculator && CalculatorComponent}
	<div class="min-h-screen bg-gray-50">
		<!-- Calculator Header -->
		<section class="bg-white border-b border-gray-200 py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Breadcrumb -->
				<nav class="flex mb-6" aria-label="Breadcrumb">
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
						{#if category}
							<li>
								<a
									href="/category/{category.id}"
									class="text-gray-500 hover:text-gray-700"
								>
									{category.name}
								</a>
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
						{/if}
						<li>
							<span class="text-gray-900 font-medium"
								>{calculator.name}</span
							>
						</li>
					</ol>
				</nav>

				<!-- Calculator Info -->
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div
							class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl"
						>
							{calculator.icon}
						</div>
					</div>

					<div class="flex-1 min-w-0">
						<h1 class="text-3xl font-bold text-gray-900 mb-2">
							{calculator.name}
						</h1>
						<p class="text-lg text-gray-600 mb-4">
							{calculator.description}
						</p>

						<div class="flex items-center space-x-4">
							{#if category}
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
								>
									{category.icon}
									{category.name}
								</span>
							{/if}

							{#if calculator.requiresApi}
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
								>
									🌐 Uses Live Data
								</span>
							{/if}

							<span
								class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
							>
								✅ Free to Use
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Calculator Content -->
		<section class="py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<svelte:component this={CalculatorComponent} />
			</div>
		</section>
	</div>
{:else if calculator && !CalculatorComponent}
	<!-- Calculator exists but component not implemented yet -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center max-w-md mx-auto">
			<div class="text-6xl mb-4">🚧</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
			<p class="text-gray-600 mb-6">
				The <strong>{calculator.name}</strong> is currently under development.
				Check back soon for this calculator!
			</p>
			<div class="space-x-4">
				{#if category}
					<Button variant="primary" href="/category/{category.id}">
						Explore All Calculators
					</Button>
				{/if}
				<Button variant="outline" href="/categories">
					All Categories
				</Button>
			</div>
		</div>
	</div>
{:else}
	<!-- Calculator not found -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="text-6xl mb-4">❌</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">
				Calculator Not Found
			</h1>
			<p class="text-gray-600 mb-6">
				The calculator you're looking for doesn't exist or has been
				moved.
			</p>
			<div class="space-x-4">
				<Button variant="primary" href="/categories">
					Explore All Calculators
				</Button>
				<Button variant="outline" href="/">Go Home</Button>
			</div>
		</div>
	</div>
{/if}
