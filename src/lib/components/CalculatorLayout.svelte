<script>
  /**
   * Calculator Layout Component
   * Consistent layout wrapper for all calculator pages
   */
  
  import Card from './ui/Card.svelte';
  import Button from './ui/Button.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import ErrorBoundary from './ErrorBoundary.svelte';
  
  /** @type {string} */
  export let title;
  
  /** @type {string} */
  export let description;
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {boolean} */
  export let hasError = false;
  
  /** @type {string} */
  export let errorMessage = '';
  
  /** @type {Array} */
  export let relatedCalculators = [];
  
  /** @type {string} */
  export let category = '';
</script>

<ErrorBoundary {hasError} {errorMessage} calculatorName={title}>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Header -->
    <Card>
      <div class="p-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
        
        <!-- Trust Indicators -->
        <div class="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Free Forever</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            <span>Instant Results</span>
          </div>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </Card>
    
    <!-- Loading State -->
    {#if loading}
      <Card>
        <div class="p-12">
          <LoadingSpinner size="lg" message="Calculating..." />
        </div>
      </Card>
    {/if}
    
    <!-- Calculator Content -->
    <div class="space-y-6">
      <slot />
    </div>
    
    <!-- Related Calculators -->
    {#if relatedCalculators.length > 0}
      <Card>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Related Calculators
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each relatedCalculators as calc}
              <a 
                href="/calculator/{calc.id}"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <span class="text-lg">{calc.icon}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {calc.name}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    {calc.description}
                  </p>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            {/each}
          </div>
        </div>
      </Card>
    {/if}
    
    <!-- Help Section -->
    <Card>
      <div class="p-6 bg-blue-50 border border-blue-200">
        <h3 class="text-lg font-semibold text-blue-900 mb-2">
          Need Help?
        </h3>
        <p class="text-blue-800 text-sm mb-4">
          If you're having trouble with this calculator or need assistance with your calculations, 
          we're here to help.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" href="/about" size="sm">
            Learn More About kceva
          </Button>
          {#if category}
            <Button variant="outline" href="/category/{category}" size="sm">
              Browse {category} Calculators
            </Button>
          {/if}
        </div>
      </div>
    </Card>
  </div>
</ErrorBoundary>