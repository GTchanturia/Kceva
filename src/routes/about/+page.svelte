<script>
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head>
	<title>About Kceva - Free Online Calculators</title>
	<meta name="description" content="Learn about Kceva, your trusted source for 100+ free online calculators and converters. Fast, accurate, and privacy-focused tools for everyday use." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<section class="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
				About Kceva
			</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Your trusted companion for accurate calculations and conversions. 
				We believe powerful tools should be free, fast, and accessible to everyone.
			</p>
		</div>
	</section>
	
	<!-- Mission Section -->
	<section class="py-16 bg-white">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<Card>
					<div class="p-6 text-center">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<span class="text-2xl">🎯</span>
						</div>
						<h3 class="text-xl font-semibold text-gray-900 mb-2">Accuracy First</h3>
						<p class="text-gray-600">
							Every calculator uses thoroughly tested formulas and algorithms to ensure precise results you can trust.
						</p>
					</div>
				</Card>
				
				<Card>
					<div class="p-6 text-center">
						<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<span class="text-2xl">🆓</span>
						</div>
						<h3 class="text-xl font-semibold text-gray-900 mb-2">Always Free</h3>
						<p class="text-gray-600">
							No subscriptions, no hidden fees, no premium tiers. All our tools are completely free to use forever.
						</p>
					</div>
				</Card>
				
				<Card>
					<div class="p-6 text-center">
						<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<span class="text-2xl">🔒</span>
						</div>
						<h3 class="text-xl font-semibold text-gray-900 mb-2">Privacy Focused</h3>
						<p class="text-gray-600">
							Your calculations stay on your device. We don't store, track, or share your personal data.
						</p>
					</div>
				</Card>
			</div>
		</div>
	</section>
	
	<!-- Story Section -->
	<section class="py-16 bg-gray-50">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
			</div>
			
			<div class="prose prose-lg mx-auto text-gray-600">
				<p>
					Kceva was born from a simple frustration: finding reliable, free calculators online 
					shouldn't be a treasure hunt through ad-filled websites and questionable results.
				</p>
				
				<p>
					We noticed that most online calculators were either buried in complex websites, 
					loaded with advertisements, or required subscriptions for basic functionality. 
					There had to be a better way.
				</p>
				
				<p>
					So we built Kceva - a clean, fast, and comprehensive collection of calculators 
					that puts user experience first. No ads, no tracking, no nonsense. Just the tools 
					you need, when you need them.
				</p>
				
				<p>
					Today, Kceva serves thousands of users daily, from students solving math problems 
					to professionals making financial decisions. We're proud to be a trusted resource 
					for accurate calculations across 10 different categories.
				</p>
			</div>
		</div>
	</section>
	
	<!-- Features Section -->
	<section class="py-16 bg-white">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">⚡</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
						<p class="text-gray-600">
							All calculations happen instantly in your browser. No server delays, no loading screens.
						</p>
					</div>
				</div>
				
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">📱</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
						<p class="text-gray-600">
							Perfect experience on any device - desktop, tablet, or smartphone.
						</p>
					</div>
				</div>
				
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">🔍</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Easy to Find</h3>
						<p class="text-gray-600">
							Powerful search and intuitive categories help you find the right tool quickly.
						</p>
					</div>
				</div>
				
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">🎨</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Clean Design</h3>
						<p class="text-gray-600">
							Distraction-free interface that focuses on what matters - your calculations.
						</p>
					</div>
				</div>
				
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">🌐</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Works Offline</h3>
						<p class="text-gray-600">
							Most calculators work without an internet connection once the page loads.
						</p>
					</div>
				</div>
				
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
							<span class="text-xl">♿</span>
						</div>
					</div>
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Accessible</h3>
						<p class="text-gray-600">
							Built with accessibility in mind, ensuring everyone can use our tools effectively.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Stats Section -->
	<section class="py-16 bg-blue-600">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-white mb-12">Kceva by the Numbers</h2>
			
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				<div>
					<div class="text-4xl font-bold text-white mb-2">100+</div>
					<div class="text-blue-100">Calculators & Converters</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-white mb-2">10</div>
					<div class="text-blue-100">Categories</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-white mb-2">1M+</div>
					<div class="text-blue-100">Calculations Performed</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-white mb-2">99.9%</div>
					<div class="text-blue-100">Uptime</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- CTA Section -->
	<section class="py-16 bg-gray-50">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-4">
				Ready to Start Calculating?
			</h2>
			<p class="text-xl text-gray-600 mb-8">
				Explore our comprehensive collection of free calculators and converters
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" href="/categories">
					Browse All Calculators
				</Button>
				<Button variant="outline" size="lg" href="/contact">
					Get in Touch
				</Button>
			</div>
		</div>
	</section>
</div>