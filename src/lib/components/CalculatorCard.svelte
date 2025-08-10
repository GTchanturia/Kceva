<script>
  /**
   * Calculator Card Component
   * @component
   */
  
  import Card from '$lib/components/ui/Card.svelte';
  import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
  
  /** @type {Object} */
  export let calculator;
  
  /** @type {boolean} */
  export let featured = false;
  
  // Get category info
  $: category = CALCULATOR_CATEGORIES.find(cat => cat.id === calculator.category);
  
  // Get color classes based on category
  $: colorClasses = category ? {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  }[category.color] || 'bg-gray-50 text-gray-700 border-gray-200' : 'bg-gray-50 text-gray-700 border-gray-200';
</script>

<Card hover={true} className={featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}>
  <a href="/calculator/{calculator.id}" class="block p-6 h-full">
    <div class="flex items-start space-x-4">
      <!-- Calculator Icon -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-lg {colorClasses} flex items-center justify-center text-xl font-semibold border">
          {calculator.icon}
        </div>
      </div>
      
      <!-- Calculator Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-lg font-semibold text-gray-900 truncate">
            {calculator.name}
          </h3>
          
          {#if featured}
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              Featured
            </span>
          {/if}
          
          {#if calculator.requiresApi}
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
              API
            </span>
          {/if}
        </div>
        
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">
          {calculator.description}
        </p>
        
        <!-- Category Badge -->
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {colorClasses}">
            {category?.icon} {category?.name}
          </span>
          
          <!-- Arrow Icon -->
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </a>
</Card>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>