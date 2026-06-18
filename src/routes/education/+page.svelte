<script>
	import Card from "$lib/components/ui/Card.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { getCalculatorsByCategory } from "$lib/data/calculators/index.js";

	export let data;
	const { seo } = data;

	const educationCalculators = getCalculatorsByCategory('education');

	const learningPaths = [
		{
			title: "Financial Literacy",
			description: "Master personal finance with our comprehensive calculator guides",
			duration: "2-4 months",
			level: "All Levels",
			href: "/category/finance",
			color: "green"
		},
		{
			title: "Mathematics Fundamentals",
			description: "Strengthen your math skills with interactive calculators",
			duration: "3-6 months",
			level: "Beginner to Intermediate",
			href: "/category/math",
			color: "purple"
		}
	];

	const resources = [
		{
			title: "Calculator Guides",
			description: "Step-by-step guides for using our calculators effectively",
			icon: "📚",
			items: ["BMI Calculator Guide", "Loan Calculator Tutorial", "Investment Planning"]
		},
		{
			title: "Formula References",
			description: "Mathematical formulas and explanations behind our calculators",
			icon: "📐",
			items: ["Financial Formulas", "Health Metrics", "Geometric Calculations"]
		},
		{
			title: "Best Practices",
			description: "Tips and best practices for accurate calculations",
			icon: "💡",
			items: ["Data Input Guidelines", "Result Interpretation", "Common Mistakes"]
		}
	];
</script>

<svelte:head>
	{#if seo}
		<title>{seo.title}</title>
		<meta name="description" content={seo.description} />
		<link rel="canonical" href={seo.url} />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:url" content={seo.url} />
		<meta property="og:type" content="website" />
		<meta name="twitter:title" content={seo.title} />
		<meta name="twitter:description" content={seo.description} />
	{/if}
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		"name": "kceva Education",
		"description": "Free educational resources and learning paths for finance and mathematics",
		"url": "https://kceva.com/education/"
	})}</script>
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kceva.com/" },
			{ "@type": "ListItem", "position": 2, "name": "Education", "item": "https://kceva.com/education/" }
		]
	})}</script>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-slate-50 to-white py-14 lg:py-20">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<div class="text-6xl mb-5" aria-hidden="true">🎓</div>
			<h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
				Education &amp; Learning
			</h1>
			<p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
				Comprehensive learning resources, roadmaps, and guides to master
				finance, mathematics, and more with our free tools.
			</p>
		</div>
	</section>

	<!-- Breadcrumb -->
	<nav class="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<ol class="flex items-center gap-2 text-sm">
				<li><a href="/" class="text-gray-500 hover:text-blue-600 transition-colors">Home</a></li>
				<li class="text-gray-400">/</li>
				<li><span class="text-gray-900 font-medium">Education</span></li>
			</ol>
		</div>
	</nav>

	<!-- Learning Paths -->
	<section class="py-14 lg:py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl font-bold text-slate-900 mb-3">Learning Paths</h2>
				<p class="text-slate-500 max-w-xl mx-auto">
					Structured learning journeys designed to take you from beginner to expert
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
				{#each learningPaths as path}
					<div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
						<div class="flex-1">
							<h3 class="text-xl font-semibold text-slate-900 mb-3">{path.title}</h3>
							<p class="text-slate-500 mb-4 leading-relaxed">{path.description}</p>
							<dl class="space-y-1.5 text-sm text-slate-500">
								<div class="flex justify-between">
									<dt>Duration:</dt>
									<dd class="font-medium text-slate-700">{path.duration}</dd>
								</div>
								<div class="flex justify-between">
									<dt>Level:</dt>
									<dd class="font-medium text-slate-700">{path.level}</dd>
								</div>
							</dl>
						</div>
						<div class="mt-5">
							<Button variant="outline" href={path.href} className="w-full">Start Learning</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Educational Resources -->
	<section class="py-14 lg:py-16 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl font-bold text-slate-900 mb-3">Educational Resources</h2>
				<p class="text-slate-500 max-w-xl mx-auto">
					Comprehensive guides and references to help you get the most out of our calculators
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each resources as resource}
					<div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
						<div class="text-4xl mb-4" aria-hidden="true">{resource.icon}</div>
						<h3 class="text-xl font-semibold text-slate-900 mb-2">{resource.title}</h3>
						<p class="text-slate-500 text-sm mb-4 leading-relaxed">{resource.description}</p>
						<ul class="space-y-2">
							{#each resource.items as item}
								<li class="flex items-center gap-2 text-sm text-slate-500">
									<span class="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" aria-hidden="true"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Education Calculators -->
	<section class="py-14 lg:py-16 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-10">
				<h2 class="text-3xl font-bold text-slate-900 mb-3">Educational Calculators</h2>
				<p class="text-slate-500 max-w-xl mx-auto">
					Specialized calculators designed for students, teachers, and lifelong learners
				</p>
			</div>
			{#if educationCalculators.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{#each educationCalculators as calculator}
						<div class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
							<div class="flex items-center gap-3 mb-3">
								<span class="text-2xl" aria-hidden="true">{calculator.icon}</span>
								<h3 class="text-base font-semibold text-slate-900">{calculator.name}</h3>
							</div>
							<p class="text-sm text-slate-500 mb-4 leading-relaxed">{calculator.description}</p>
							<Button variant="outline" href="/calculator/{calculator.id}" className="w-full text-sm">
								Use Calculator
							</Button>
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center py-12">
					<div class="text-5xl mb-4" aria-hidden="true">📚</div>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">Content Coming Soon</h3>
					<p class="text-slate-500 mb-6">We're working on comprehensive educational resources and tutorials.</p>
					<Button variant="primary" href="/categories">Explore All Categories</Button>
				</div>
			{/if}
		</div>
	</section>

	<!-- CTA -->
	<section class="py-14 bg-blue-600">
		<div class="max-w-3xl mx-auto px-4 text-center">
			<h2 class="text-3xl font-bold text-white mb-4">Start Your Learning Journey</h2>
			<p class="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
				Whether you're a student, professional, or lifelong learner, our tools are here to support your growth.
			</p>
			<Button href="/categories" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
				Browse All Tools
			</Button>
		</div>
	</section>
</div>
