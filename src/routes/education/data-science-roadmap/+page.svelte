<script>
	import Card from "$lib/components/ui/Card.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	export let data;
	const { seo } = data;

	// Enhanced roadmap phases with more detail
	const phases = [
		{
			phase: 1,
			title: "Mathematical & Programming Foundations",
			duration: "2-3 months",
			description: "Build the essential mathematical and programming skills that form the backbone of data science",
			color: "blue",
			topics: [
				{
					category: "Mathematics & Statistics",
					items: [
						"Linear Algebra: vectors, matrices, eigenvalues, transformations (essential for ML algorithms)",
						"Statistics: probability theory, distributions, hypothesis testing, regression analysis",
						"Calculus: derivatives, integrals, optimization (understanding gradients for ML)"
					]
				},
				{
					category: "Programming with Python",
					items: [
						"Python fundamentals: data structures, functions, object-oriented programming",
						"NumPy: numerical operations, array manipulation, broadcasting",
						"Pandas: data manipulation, cleaning, analysis, and DataFrame operations"
					]
				},
				{
					category: "Database Management with SQL",
					items: [
						"SQL fundamentals: SELECT, JOIN, GROUP BY, window functions",
						"Database design principles and normalization",
						"Data extraction, transformation, and loading (ETL) processes"
					]
				}
			]
		},
		{
			phase: 2,
			title: "Data Processing & Analysis",
			duration: "2-3 months",
			description: "Master the art of collecting, cleaning, and extracting insights from real-world data",
			color: "green",
			topics: [
				{
					category: "Data Collection & Cleaning",
					items: [
						"Data acquisition: APIs, web scraping, databases, file formats (CSV, JSON, XML)",
						"Data cleaning: handling missing values, duplicates, outliers, and inconsistencies",
						"Data validation, quality assessment, and documentation best practices"
					]
				},
				{
					category: "Exploratory Data Analysis (EDA)",
					items: [
						"Statistical analysis: descriptive statistics, distributions, pattern recognition",
						"Data profiling: understanding data types, ranges, and relationships",
						"Correlation analysis, feature engineering, and hypothesis generation"
					]
				},
				{
					category: "Data Visualization",
					items: [
						"Static visualizations: Matplotlib, Seaborn for publication-ready charts",
						"Interactive visualizations: Plotly, Bokeh for dynamic exploration",
						"Dashboard development: Streamlit, Dash, or Tableau for stakeholder communication"
					]
				}
			]
		},
		{
			phase: 3,
			title: "Machine Learning",
			duration: "3-4 months",
			description: "Build predictive models and understand the core algorithms that power AI applications",
			color: "purple",
			topics: [
				{
					category: "ML Fundamentals",
					items: [
						"Learning paradigms: Supervised, Unsupervised, and Reinforcement Learning",
						"Model evaluation: accuracy, precision, recall, F1-score, ROC-AUC, confusion matrices",
						"Cross-validation, bias-variance tradeoff, and overfitting prevention techniques"
					]
				},
				{
					category: "Supervised Learning",
					items: [
						"Regression algorithms: Linear, Logistic, Polynomial, Ridge, Lasso regression",
						"Classification: Decision Trees, Random Forest, SVM, KNN, Naive Bayes",
						"Ensemble methods: Bagging, Boosting (XGBoost, AdaBoost), model stacking"
					]
				},
				{
					category: "Unsupervised Learning",
					items: [
						"Clustering algorithms: K-Means, DBSCAN, Hierarchical clustering",
						"Dimensionality reduction: PCA, t-SNE, UMAP for data visualization",
						"Association rules, anomaly detection, and pattern mining"
					]
				}
			]
		},
		{
			phase: 4,
			title: "Advanced Topics & Specialization",
			duration: "4-6 months",
			description: "Specialize in cutting-edge techniques and choose your area of expertise",
			color: "orange",
			topics: [
				{
					category: "Deep Learning",
					items: [
						"Neural Networks: architecture design, backpropagation, activation functions",
						"Convolutional Neural Networks (CNNs) for image recognition and computer vision",
						"Recurrent Neural Networks (RNNs/LSTMs) for time series and natural language",
						"Deep learning frameworks: TensorFlow, Keras, PyTorch, and model deployment"
					]
				},
				{
					category: "Natural Language Processing",
					items: [
						"Text preprocessing: tokenization, stemming, lemmatization, stop words",
						"NLP tasks: sentiment analysis, topic modeling, text classification",
						"Named Entity Recognition (NER) and information extraction",
						"Modern NLP: BERT, GPT, Transformers, and large language models"
					]
				},
				{
					category: "Big Data & Cloud Computing",
					items: [
						"Big data processing: Apache Spark, Hadoop ecosystem for large datasets",
						"Cloud platforms: AWS (SageMaker), GCP (BigQuery), Azure (ML Studio)",
						"Data engineering: ETL pipelines, data warehousing, real-time processing",
						"MLOps: model versioning, monitoring, automated deployment, CI/CD"
					]
				}
			]
		},
		{
			phase: 5,
			title: "Practice & Portfolio",
			duration: "Ongoing",
			description: "Transform theoretical knowledge into practical skills through projects and professional development",
			color: "teal",
			topics: [
				{
					category: "Project Development",
					items: [
						"End-to-end projects: from problem definition to model deployment",
						"Kaggle competitions: practice with real datasets and learn from community",
						"Industry projects: solve actual business problems with data science",
						"Model deployment: APIs, web apps, cloud services, and monitoring"
					]
				},
				{
					category: "Portfolio Building",
					items: [
						"Professional GitHub portfolio with well-documented, reproducible projects",
						"Technical writing: blog posts, tutorials, and project documentation",
						"Case studies: detailed analysis of your problem-solving approach",
						"Open source contributions to data science libraries and tools"
					]
				},
				{
					category: "Professional Development",
					items: [
						"Professional networking: LinkedIn, data science meetups, online communities",
						"Conference participation: attending talks, presenting your work",
						"Continuous learning: following research papers, industry trends, new tools",
						"Knowledge sharing: mentoring others, teaching, and building your reputation"
					]
				}
			]
		}
	];

	// Enhanced success tips
	const tips = [
		{
			title: "Master the Fundamentals",
			description: "Strong foundations in math and programming will accelerate your progress in advanced topics. Don't rush through the basics.",
			icon: "🎯",
			priority: "high"
		},
		{
			title: "Learn by Doing",
			description: "Theory without practice is incomplete. Work on projects from day one, even simple ones. Apply concepts immediately.",
			icon: "🛠️",
			priority: "high"
		},
		{
			title: "Join the Community",
			description: "Data science is collaborative. Join online communities, attend meetups, and learn from others' experiences.",
			icon: "👥",
			priority: "medium"
		},
		{
			title: "Focus on Problem-Solving",
			description: "Data science is about solving real problems with data. Always start with the business question, not the algorithm.",
			icon: "💡",
			priority: "high"
		},
		{
			title: "Build a Portfolio",
			description: "Document your learning journey. A strong portfolio with diverse projects is your ticket to landing your first role.",
			icon: "📁",
			priority: "high"
		},
		{
			title: "Be Patient",
			description: "Data science mastery takes 1-2 years of consistent effort. Celebrate small wins and maintain long-term perspective.",
			icon: "⏳",
			priority: "medium"
		}
	];

	// Learning resources
	const learningResources = [
		{
			category: "Online Courses",
			items: [
				"Coursera: Machine Learning by Andrew Ng",
				"edX: MIT Introduction to Computer Science",
				"Udacity: Data Science Nanodegree",
				"Kaggle Learn: Free micro-courses"
			]
		},
		{
			category: "Books & References",
			items: [
				"'Hands-On Machine Learning' by Aurélien Géron",
				"'Python for Data Analysis' by Wes McKinney",
				"'The Elements of Statistical Learning' by Hastie, Tibshirani, Friedman",
				"'Introduction to Statistical Learning' by James, Witten, Hastie, Tibshirani"
			]
		},
		{
			category: "Practice Platforms",
			items: [
				"Kaggle: Competitions and datasets",
				"Google Colab: Free GPU/TPU for experiments",
				"GitHub: Version control and portfolio",
				"Jupyter Notebooks: Interactive development"
			]
		}
	];
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:url" content={seo.url} />
	<link rel="canonical" href={seo.url} />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section with Visual Roadmap -->
	<section class="bg-gradient-to-br from-slate-50 to-blue-50 py-16 lg:py-24">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<div class="text-6xl mb-6">🚀</div>
				<h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
					Data Science Roadmap
				</h1>
				<p class="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
					Your complete guide to becoming a data scientist. This comprehensive roadmap takes you 
					from beginner to expert with structured learning phases, practical projects, and industry insights.
				</p>
			</div>
			
			<!-- Quick Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
				<div class="text-center">
					<div class="text-2xl font-bold text-blue-600">12-18</div>
					<div class="text-sm text-slate-600">Months to Master</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-green-600">5</div>
					<div class="text-sm text-slate-600">Learning Phases</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-purple-600">15+</div>
					<div class="text-sm text-slate-600">Key Topics</div>
				</div>
				<div class="text-center">
					<div class="text-2xl font-bold text-orange-600">∞</div>
					<div class="text-sm text-slate-600">Career Opportunities</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Breadcrumb -->
	<section class="bg-white border-b border-slate-100 py-4">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
						<a href="/education" class="text-slate-500 hover:text-slate-700">Education</a>
					</li>
					<li>
						<svg class="flex-shrink-0 h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
						</svg>
					</li>
					<li>
						<span class="text-slate-900 font-medium">Data Science Roadmap</span>
					</li>
				</ol>
			</nav>
		</div>
	</section>

	<!-- Introduction -->
	<section class="py-12 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<Card>
				<div class="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
					<h2 class="text-2xl font-bold text-slate-900 mb-4">
						Welcome to Your Data Science Journey! 🎉
					</h2>
					<p class="text-slate-600 leading-relaxed max-w-3xl mx-auto">
						Data science is one of the most exciting and in-demand fields today. This roadmap provides 
						a structured, step-by-step approach to mastering data science, from mathematical foundations 
						to advanced machine learning and real-world applications. Let's begin this transformative journey together!
					</p>
				</div>
			</Card>
		</div>
	</section>

	<!-- Roadmap Phases -->
	<section class="py-16 lg:py-20">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					5-Phase Learning Journey
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Each phase builds upon the previous one, creating a solid foundation for data science mastery
				</p>
			</div>

			<div class="space-y-12">
				{#each phases as phase}
					<Card className="overflow-hidden">
						<div class="p-8">
							<!-- Phase Header -->
							<div class="flex items-center space-x-4 mb-6">
								<div class="w-12 h-12 bg-{phase.color}-100 text-{phase.color}-700 rounded-full flex items-center justify-center text-xl font-bold border-2 border-{phase.color}-200">
									{phase.phase}
								</div>
								<div class="flex-1">
									<h3 class="text-2xl font-bold text-slate-900 mb-1">
										Phase {phase.phase}: {phase.title}
									</h3>
									<div class="flex items-center space-x-4 text-sm text-slate-500">
										<span class="flex items-center">
											<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{phase.duration}
										</span>
									</div>
								</div>
							</div>
							
							<!-- Phase Description -->
							<p class="text-slate-600 mb-8 text-lg leading-relaxed">
								{phase.description}
							</p>
							
							<!-- Topics Grid -->
							<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
								{#each phase.topics as topic}
									<div class="bg-slate-50 rounded-lg p-6 border border-slate-100">
										<h4 class="text-lg font-semibold text-slate-900 mb-4">
											{topic.category}
										</h4>
										<ul class="space-y-3">
											{#each topic.items as item}
												<li class="flex items-start">
													<div class="w-1.5 h-1.5 bg-{phase.color}-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
													<span class="text-sm text-slate-600 leading-relaxed">{item}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</section>

	<!-- Learning Resources -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					Recommended Learning Resources
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Curated resources to support your learning journey at every phase
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each learningResources as resource}
					<Card>
						<div class="p-6">
							<h3 class="text-xl font-semibold text-slate-900 mb-4">
								{resource.category}
							</h3>
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
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-slate-900 mb-4">
					Keys to Success
				</h2>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Proven strategies from successful data scientists to accelerate your learning
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each tips as tip}
					<div class="bg-slate-50 rounded-lg p-6 border border-slate-100 {tip.priority === 'high' ? 'ring-2 ring-blue-200' : ''}">
						<div class="text-3xl mb-4">{tip.icon}</div>
						<h3 class="text-lg font-semibold text-slate-900 mb-3">
							{tip.title}
							{#if tip.priority === 'high'}
								<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 ml-2">
									Essential
								</span>
							{/if}
						</h3>
						<p class="text-slate-600 leading-relaxed">
							{tip.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Career Outcomes -->
	<section class="py-16 lg:py-20 bg-slate-50">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<Card>
				<div class="p-8">
					<div class="text-center mb-8">
						<h2 class="text-3xl font-bold text-slate-900 mb-4">
							Career Opportunities
						</h2>
						<p class="text-lg text-slate-600">
							Data science skills open doors to diverse, high-impact career paths
						</p>
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 class="text-xl font-semibold text-slate-900 mb-4">Popular Roles</h3>
							<ul class="space-y-3">
								{#each ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'Research Scientist', 'AI Product Manager', 'Data Engineer'] as role}
									<li class="flex items-center">
										<div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
										<span class="text-slate-600">{role}</span>
									</li>
								{/each}
							</ul>
						</div>
						
						<div>
							<h3 class="text-xl font-semibold text-slate-900 mb-4">Industries</h3>
							<ul class="space-y-3">
								{#each ['Technology & Software', 'Healthcare & Pharmaceuticals', 'Finance & Banking', 'E-commerce & Retail', 'Consulting', 'Government & Research'] as industry}
									<li class="flex items-center">
										<div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
										<span class="text-slate-600">{industry}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 bg-blue-600">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-white mb-6">
				Start Your Data Science Journey Today
			</h2>
			<p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
				The best time to start was yesterday. The second best time is now. 
				Begin with Phase 1 and take the first step toward your data science career.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" href="/calculator/roadmap" className="bg-white text-blue-600 hover:bg-slate-50">
					View Interactive Roadmap
				</Button>
				<Button variant="outline" size="lg" href="/category/education" className="border-white text-white hover:bg-white hover:text-blue-600">
					Education Calculators
				</Button>
			</div>
		</div>
	</section>
</div>