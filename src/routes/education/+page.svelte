<script>
	import Card from "$lib/components/ui/Card.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { getCalculatorsByCategory } from "$lib/data/calculators/index.js";

	// Get education calculators
	$: educationCalculators = getCalculatorsByCategory('education');

	// Learning paths
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

	// Educational resources
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
	<title>Education & Learning Resources - Free Guides & Roadmaps | kceva</title>
	<meta name="description" content="Explore educational resources, learning roadmaps, and comprehensive guides at kceva. Master  financial literacy, and mathematics with our free tools and tutorials." />
	<meta name="keywords" content="kceva, education, learning,  financial literacy, mathematics, tutorials, guides, free education" />
	<link rel="canonical" href="https://kceva.com/education" />
	
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "EducationalOrganization",
			"name": "kceva Education",
			"description": "Free educational resources and learning paths for finance and mathematics",
			"url": "https://kceva.com/education"SD
		}
	</script>	
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="relative bg-gradient-to-br from-slate-50 to-blue-50 py-16 lg:py-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<div class="text-6xl mb-6">🎓</div>
				<h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
					Education &
					<span class="text-blue-600">Learning</span>
				</h1>
				<p class="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
					Comprehensive learning resources, roadmaps, and guides to master 
					finance, mathematics, and more with our free tools.
				</p>
			</div>
		</div>
	</section>

	<!-- Learning Paths -->
	<section class="py-16 lg:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Learning Paths
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Structured learning journeys designed to take you from beginner to expert
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each learningPaths as path}
					<Card hover={true}>
						<div class="p-6 h-full flex flex-col">
							<div class="flex-1">
								<h3 class="text-xl font-semibold text-slate-900 mb-3">
									{path.title}
								</h3>
								<p class="text-slate-600 mb-4 leading-relaxed">
									{path.description}
								</p>
								<div class="space-y-2 text-sm text-slate-500">
									<div class="flex justify-between">
										<span>Duration:</span>
										<span class="font-medium">{path.duration}</span>
									</div>
									<div class="flex justify-between">
										<span>Level:</span>
										<span class="font-medium">{path.level}</span>
									</div>
								</div>
							</div>
							<div class="mt-6">
								<Button variant="outline" href={path.href} className="w-full">
									Start Learning
								</Button>
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Educational Resources -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Educational Resources
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Comprehensive guides and references to help you get the most out of our calculators
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each resources as resource}
					<Card>
						<div class="p-6">
							<div class="text-4xl mb-4">{resource.icon}</div>
							<h3 class="text-xl font-semibold text-slate-900 mb-3">
								{resource.title}
							</h3>
							<p class="text-slate-600 mb-4">
								{resource.description}
							</p>
							<ul class="space-y-2">
								{#each resource.items as item}
									<li class="flex items-center text-sm text-slate-600">
										<div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Education Calculators -->
	<section class="py-16 lg:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
					Educational Calculators
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Specialized calculators designed for students, teachers, and lifelong learners
				</p>
			</div>

			{#if educationCalculators.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each educationCalculators as calculator}
						<div class="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
							<div class="flex items-center space-x-3 mb-4">
								<div class="text-2xl">{calculator.icon}</div>
								<h3 class="text-lg font-semibold text-slate-900">
									{calculator.name}
								</h3>
							</div>
							<p class="text-slate-600 mb-4">
								{calculator.description}
							</p>
							<Button variant="outline" href="/calculator/{calculator.id}" className="w-full">
								Use Calculator
							</Button>
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center py-12">
					<div class="text-6xl mb-4">📚</div>
					<h3 class="text-xl font-semibold text-slate-900 mb-2">
						Educational Content Coming Soon
					</h3>
					<p class="text-slate-600 mb-6">
						We're working on comprehensive educational resources and tutorials.
					</p>
					<Button variant="primary" href="/categories">
						Explore All Categories
					</Button>
				</div>
			{/if}
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 bg-blue-600">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
				Start Your Learning Journey
			</h2>
			<p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
				Whether you're a student, professional, or lifelong learner, 
				our tools and resources are here to support your growth.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				
				<Button variant="outline" size="lg" href="/categories" className="border-white text-white hover:bg-white hover:text-blue-600">
					Browse All Tools
				</Button>
			</div>
		</div>
	</section>
</div>