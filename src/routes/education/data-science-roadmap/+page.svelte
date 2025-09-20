<script>
	import Card from "$lib/components/ui/Card.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	// Roadmap phases
	const phases = [
		{
			phase: 1,
			title: "Foundations",
			duration: "2-3 months",
			description: "Build essential mathematical and programming foundations",
			topics: [
				{
					category: "Mathematics & Statistics",
					items: [
						"Linear Algebra: vectors, matrices, transformations",
						"Statistics: probability theory, distributions, hypothesis testing",
						"Calculus: derivatives, integrals (basic understanding)"
					]
				},
				{
					category: "Programming (Python recommended)",
					items: [
						"Python fundamentals: data structures, functions, OOP",
						"NumPy: numerical operations and array manipulation",
						"Pandas: data manipulation and analysis"
					]
				},
				{
					category: "Databases (SQL)",
					items: [
						"SQL fundamentals: SELECT, JOIN, GROUP BY",
						"Database design principles",
						"Data extraction and manipulation"
					]
				}
			]
		},
		{
			phase: 2,
			title: "Data Processing & Analysis",
			duration: "2-3 months",
			description: "Learn to collect, clean, and analyze data effectively",
			topics: [
				{
					category: "Data Collection & Cleaning",
					items: [
						"Data sources: APIs, web scraping, file formats",
						"Handling missing values and duplicates",
						"Data validation and quality assessment"
					]
				},
				{
					category: "Exploratory Data Analysis (EDA)",
					items: [
						"Statistical analysis and pattern recognition",
						"Data profiling and summary statistics",
						"Correlation analysis and feature relationships"
					]
				},
				{
					category: "Data Visualization",
					items: [
						"Matplotlib & Seaborn for static visualizations",
						"Plotly for interactive charts",
						"Dashboard creation with Streamlit or Dash"
					]
				}
			]
		},
		{
			phase: 3,
			title: "Machine Learning",
			duration: "3-4 months",
			description: "Master machine learning algorithms and model building",
			topics: [
				{
					category: "ML Fundamentals",
					items: [
						"Supervised vs Unsupervised vs Reinforcement Learning",
						"Model evaluation metrics: accuracy, precision, recall, F1",
						"Cross-validation and overfitting prevention"
					]
				},
				{
					category: "Supervised Learning",
					items: [
						"Regression: Linear, Logistic, Polynomial",
						"Classification: Decision Trees, Random Forest, SVM, KNN",
						"Ensemble methods and model selection"
					]
				},
				{
					category: "Unsupervised Learning",
					items: [
						"Clustering: K-Means, Hierarchical clustering",
						"Dimensionality reduction: PCA, t-SNE",
						"Association rules and market basket analysis"
					]
				}
			]
		},
		{
			phase: 4,
			title: "Advanced Topics & Specialization",
			duration: "4-6 months",
			description: "Dive deep into specialized areas and advanced techniques",
			topics: [
				{
					category: "Deep Learning",
					items: [
						"Neural Networks: architecture, backpropagation",
						"CNNs for Computer Vision",
						"RNNs/LSTMs for sequence data and NLP",
						"Frameworks: TensorFlow, Keras, PyTorch"
					]
				},
				{
					category: "Natural Language Processing",
					items: [
						"Text preprocessing and tokenization",
						"Sentiment analysis and topic modeling",
						"Named Entity Recognition (NER)",
						"Modern NLP: BERT, GPT, Transformers"
					]
				},
				{
					category: "Big Data & Cloud",
					items: [
						"Apache Spark for large-scale data processing",
						"Cloud platforms: AWS, GCP, Azure",
						"Data pipelines and ETL processes",
						"Distributed computing concepts"
					]
				}
			]
		},
		{
			phase: 5,
			title: "Practice & Portfolio",
			duration: "Ongoing",
			description: "Build real-world projects and establish your professional presence",
			topics: [
				{
					category: "Project Development",
					items: [
						"End-to-end projects from data collection to deployment",
						"Kaggle competitions and datasets",
						"Real-world problem solving",
						"Model deployment and productionization"
					]
				},
				{
					category: "Portfolio Building",
					items: [
						"GitHub portfolio with documented projects",
						"Technical blog writing",
						"Case studies and project presentations",
						"Open source contributions"
					]
				},
				{
					category: "Professional Development",
					items: [
						"Networking in data science communities",
						"Conference attendance and presentations",
						"Continuous learning and staying updated",
						"Mentoring and knowledge sharing"
					]
				}
			]
		}
	];

	// Success tips
	const tips = [
		{
			title: "Start Small",
			description: "Don't try to learn everything at once. Focus on one concept at a time.",
			icon: "🎯"
		},
		{
			title: "Practice Regularly",
			description: "Consistent daily practice is more effective than intensive weekend sessions.",
			icon: "📅"
		},
		{
			title: "Build Projects",
			description: "Apply your knowledge to real projects. Learning by doing is most effective.",
			icon: "🛠️"
		},
		{
			title: "Join Communities",
			description: "Connect with other learners and professionals for support and networking.",
			icon: "👥"
		},
		{
			title: "Stay Updated",
			description: "Data science evolves rapidly. Follow blogs, papers, and industry trends.",
			icon: "📰"
		},
		{
			title: "Be Patient",
			description: "Mastery takes time. Celebrate small wins and stay persistent.",
			icon: "⏳"
		}
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-slate-50 to-blue-50 py-16 lg:py-20">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<div class="text-6xl mb-6">🎓</div>
			<h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
				Education & Learning Hub
			</h1>
			<p class="text-xl text-slate-600 max-w-3xl mx-auto">
				Comprehensive educational resources, learning roadmaps, and practical guides 
				to accelerate your journey in data science, finance, and mathematics.
			</p>
		</div>
	</section>

	<!-- Breadcrumb -->
	<section class="bg-white border-b border-slate-100 py-4">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<nav class="flex" aria-label="Breadcrumb">
				<ol class="flex items-center space-x-4">
					<li>
						<a href="/" class="text-slate-500 hover:text-slate-700">Home</a>
					</li>
					<li>
						<svg class="flex-shrink-0 h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
						</svg>
					</li>
					<li>
						<span class="text-slate-900 font-medium">Education</span>
					</li>
				</ol>
			</nav>
		</div>
	</section>

	<!-- Learning Paths -->
	<section class="py-16 lg:py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					Structured Learning Paths
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Choose your learning journey and follow our step-by-step roadmaps
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each learningPaths as path}
					<Card hover={true} className="transition-all duration-200 hover:shadow-lg">
						<a href={path.href} class="block p-6 h-full">
							<div class="flex flex-col h-full">
								<div class="flex-1">
									<h3 class="text-xl font-semibold text-slate-900 mb-3">
										{path.title}
									</h3>
									<p class="text-slate-600 mb-4 leading-relaxed">
										{path.description}
									</p>
									<div class="space-y-2 text-sm">
										<div class="flex justify-between">
											<span class="text-slate-500">Duration:</span>
											<span class="font-medium text-slate-700">{path.duration}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-slate-500">Level:</span>
											<span class="font-medium text-slate-700">{path.level}</span>
										</div>
									</div>
								</div>
								<div class="mt-6 flex items-center text-blue-600 font-medium">
									<span>Start Learning</span>
									<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</a>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Educational Resources -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					Learning Resources
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Comprehensive guides and references to maximize your learning
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
							<p class="text-slate-600 mb-6">
								{resource.description}
							</p>
							<ul class="space-y-3">
								{#each resource.items as item}
									<li class="flex items-start">
										<div class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
										<span class="text-sm text-slate-600">{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Success Tips -->
	<section class="py-16 lg:py-20 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					Tips for Success
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Proven strategies to accelerate your learning and achieve your goals
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each tips as tip}
					<div class="bg-slate-50 rounded-lg p-6 border border-slate-100">
						<div class="text-3xl mb-4">{tip.icon}</div>
						<h3 class="text-lg font-semibold text-slate-900 mb-3">
							{tip.title}
						</h3>
						<p class="text-slate-600">
							{tip.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 bg-blue-600">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-white mb-6">
				Ready to Begin Your Journey?
			</h2>
			<p class="text-xl text-blue-100 mb-8">
				Start with our comprehensive Data Science Roadmap and practical calculators
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" href="/calculator/roadmap" className="bg-white text-blue-600 hover:bg-slate-50">
					View Data Science Roadmap
				</Button>
				<Button variant="outline" size="lg" href="/category/education" className="border-white text-white hover:bg-white hover:text-blue-600">
					Education Calculators
				</Button>
			</div>
		</div>
	</section>
</div>