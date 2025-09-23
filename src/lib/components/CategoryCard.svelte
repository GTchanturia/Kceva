<script>
  /**
   * Category Card Component
   * @component
   */
  
  import Card from '$lib/components/ui/Card.svelte';
  import { getCalculatorsByCategory } from '$lib/data/calculators.js';
  
  /** @type {Object} */
  export let category;
  
  // Get calculator count for this category
  $: calculatorCount = getCalculatorsByCategory(category.id).length;
  
  // Get color classes
  $: colorClasses = {
    emerald: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white',
    red: 'bg-red-500 text-white',
    indigo: 'bg-indigo-500 text-white',
    gray: 'bg-gray-500 text-white',
    pink: 'bg-pink-500 text-white',
    teal: 'bg-cyan-500 text-white',
    yellow: 'bg-yellow-500 text-white'
  }[category.color] || 'bg-gray-500 text-white';
  
  $: borderClasses = {
    emerald: 'border-green-200 hover:border-green-300 hover:shadow-lg',
    blue: 'border-blue-200 hover:border-blue-300 hover:shadow-lg',
    purple: 'border-purple-200 hover:border-purple-300 hover:shadow-lg',
    orange: 'border-orange-200 hover:border-orange-300 hover:shadow-lg',
    red: 'border-red-200 hover:border-red-300 hover:shadow-lg',
    indigo: 'border-indigo-200 hover:border-indigo-300 hover:shadow-lg',
    gray: 'border-gray-200 hover:border-gray-300 hover:shadow-lg',
    pink: 'border-pink-200 hover:border-pink-300 hover:shadow-lg',
    teal: 'border-cyan-200 hover:border-cyan-300 hover:shadow-lg',
    yellow: 'border-yellow-200 hover:border-yellow-300 hover:shadow-lg'
  }[category.color] || 'border-slate-200 hover:border-slate-300 hover:shadow-lg';
</script>

<Card hover={true} className="transition-all duration-300 {borderClasses} group">
  <a href="/category/{category.id}" class="block p-6 h-full">
    <div class="flex items-center space-x-4 mb-4">
      <!-- Category Icon -->
      <div class="flex-shrink-0">
        <div class="w-16 h-16 rounded-xl {colorClasses} flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-200">
          {category.icon}
        </div>
      </div>
      
      <!-- Category Info -->
      <div class="flex-1 min-w-0">
        <h3 class="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p class="text-sm text-slate-500">
          {calculatorCount} calculator{calculatorCount !== 1 ? 's' : ''}
        </p>
      </div>
      
      <!-- Arrow Icon -->
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    
    <!-- Category Description -->
    <p class="text-slate-600 text-sm leading-relaxed">
      {category.description}
    </p>
  </a>
</Card>