<script>
  /**
   * Calculator Card Component
   * @component
   */
  
  import Card from '$lib/components/ui/Card.svelte';
  import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
  import { getCalculatorStatus } from '$lib/utils/calculatorStatus.js';
  
  /** @type {Object} */
  export let calculator;
  
  /** @type {boolean} */
  export let featured = false;
  
  // Get category info
  $: category = CALCULATOR_CATEGORIES.find(cat => cat.id === calculator.category);
  
  // Get calculator status
  $: status = getCalculatorStatus(calculator.id);
  
  // Get color classes based on category
  $: colorClasses = category ? {
    emerald: 'bg-green-50 text-green-700 border-green-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    teal: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  }[category.color] || 'bg-gray-50 text-gray-700 border-gray-200' : 'bg-gray-50 text-gray-700 border-gray-200';
</script>

<Card hover={true} className={featured ? 'ring-2 ring-blue-500 ring-opacity-30 shadow-lg' : ''}>
  <a href="/calculator/{calculator.id}" class="block p-6 h-full">
    <div class="flex items-start space-x-4">
      <!-- Calculator Icon -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-xl {colorClasses} flex items-center justify-center text-xl font-semibold border shadow-sm">
          {calculator.icon}
        </div>
      </div>
      
      <!-- Calculator Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-lg font-semibold text-slate-900 truncate">
            {calculator.name}
          </h3>
          
          <!-- Status Indicator -->
          <div class="flex items-center">
            <div class="w-2 h-2 rounded-full {status.working ? 'bg-green-500' : 'bg-red-500'}" title="{status.working ? 'Working' : 'Under Development'}"></div>
          </div>
          
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
        
        <p class="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
          {calculator.description}
        </p>
        
        <!-- Category Badge -->
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {colorClasses}">
            {category?.icon} {category?.name}
          </span>
          
          <!-- Arrow Icon -->
          <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>