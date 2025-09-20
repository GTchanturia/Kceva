<script>
  /**
   * Error Boundary Component for Calculator Pages
   * Provides graceful error handling and user feedback
   */
  
  import { onMount } from 'svelte';
  import Button from './ui/Button.svelte';
  import Card from './ui/Card.svelte';
  
  /** @type {boolean} */
  export let hasError = false;
  
  /** @type {string} */
  export let errorMessage = '';
  
  /** @type {string} */
  export let calculatorName = '';
  
  let errorDetails = '';
  
  onMount(() => {
    // Global error handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      handleError(event.reason?.message || 'An unexpected error occurred');
    });
    
    // Global error handler for JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      handleError(event.error?.message || 'A JavaScript error occurred');
    });
  });
  
  function handleError(message) {
    hasError = true;
    errorMessage = message;
    errorDetails = new Date().toISOString();
  }
  
  function resetError() {
    hasError = false;
    errorMessage = '';
    errorDetails = '';
  }
  
  function reportError() {
    // Privacy-friendly error reporting
    const errorReport = {
      calculator: calculatorName,
      message: errorMessage,
      timestamp: errorDetails,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('Error Report:', errorReport);
    
    // In a real implementation, you might send this to an error tracking service
    // that respects user privacy (no personal data)
  }
</script>

{#if hasError}
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <Card className="max-w-md w-full">
      <div class="p-6 text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h2>
        
        {#if calculatorName}
          <p class="text-gray-600 mb-4">
            There was an issue with the <strong>{calculatorName}</strong>.
          </p>
        {/if}
        
        <p class="text-sm text-gray-500 mb-6">
          {errorMessage || 'An unexpected error occurred while processing your calculation.'}
        </p>
        
        <div class="space-y-3">
          <Button variant="primary" on:click={resetError} className="w-full">
            Try Again
          </Button>
          
          <Button variant="outline" href="/" className="w-full">
            Go to Homepage
          </Button>
          
          <button
            type="button"
            on:click={reportError}
            class="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            Report this issue
          </button>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-200">
          <h3 class="text-sm font-semibold text-gray-900 mb-2">
            Troubleshooting Tips
          </h3>
          <ul class="text-xs text-gray-600 space-y-1 text-left">
            <li>• Check that all required fields are filled</li>
            <li>• Ensure numbers are in valid ranges</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache if issues persist</li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
{:else}
  <slot />
{/if}