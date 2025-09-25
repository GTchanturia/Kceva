<script>
  /**
   * Enhanced Error Boundary Component
   * Provides comprehensive error handling with user-friendly feedback
   */
  
  import { onMount, createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {boolean} */
  export let hasError = false;
  
  /** @type {string} */
  export let errorMessage = '';
  
  /** @type {string} */
  export let calculatorName = '';
  
  /** @type {boolean} */
  export let showDetails = false;
  
  /** @type {string} */
  export let errorId = '';
  
  let errorDetails = '';
  let errorStack = '';
  let userAgent = '';
  let timestamp = '';
  
  onMount(() => {
    // Enhanced global error handlers
    const handleError = (event) => {
      console.error('JavaScript error:', event.error);
      captureError(event.error?.message || 'A JavaScript error occurred', event.error?.stack);
    };
    
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      captureError(event.reason?.message || 'An unhandled promise rejection occurred', event.reason?.stack);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  });
  
  function captureError(message, stack = '') {
    hasError = true;
    errorMessage = message;
    errorStack = stack;
    errorDetails = new Date().toISOString();
    userAgent = navigator.userAgent;
    timestamp = new Date().toLocaleString();
    errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Dispatch error event for analytics
    dispatch('error', {
      message,
      stack,
      calculatorName,
      timestamp,
      errorId
    });
  }
  
  function resetError() {
    hasError = false;
    errorMessage = '';
    errorStack = '';
    errorDetails = '';
    errorId = '';
    dispatch('reset');
  }
  
  function toggleDetails() {
    showDetails = !showDetails;
  }
  
  function copyErrorDetails() {
    const errorReport = {
      errorId,
      calculator: calculatorName,
      message: errorMessage,
      timestamp,
      userAgent,
      url: window.location.href,
      stack: errorStack
    };
    
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => {
        console.log('Error details copied to clipboard');
      })
      .catch(() => {
        console.warn('Failed to copy error details');
      });
  }
  
  function reportError() {
    // Privacy-friendly error reporting
    const errorReport = {
      errorId,
      calculator: calculatorName,
      message: errorMessage,
      timestamp,
      userAgent: navigator.userAgent,
      url: window.location.href,
      // Note: Stack trace excluded from reporting for privacy
    };
    
    console.log('Error Report:', errorReport);
    
    // In production, send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport)
    // });
  }
</script>

{#if hasError}
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center p-4" role="alert" aria-live="assertive">
    <Card className="max-w-lg w-full">
      <div class="p-6">
        <!-- Error Icon and Header -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-4 bg-error-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold text-neutral-900 mb-2">
            Something went wrong
          </h2>
          
          {#if calculatorName}
            <p class="text-neutral-600 mb-2">
              There was an issue with the <strong>{calculatorName}</strong>
            </p>
          {/if}
          
          <p class="text-sm text-neutral-500 mb-4">
            Error ID: <code class="bg-neutral-100 px-2 py-1 rounded text-xs">{errorId}</code>
          </p>
        </div>
        
        <!-- Error Message -->
        <div class="mb-6">
          <div class="bg-error-50 border border-error-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-error-800 mb-2">Error Details</h3>
            <p class="text-sm text-error-700">
              {errorMessage || 'An unexpected error occurred while processing your request.'}
            </p>
            
            {#if timestamp}
              <p class="text-xs text-error-600 mt-2">
                Occurred at: {timestamp}
              </p>
            {/if}
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-3 mb-6">
          <Button variant="primary" on:click={resetError} className="w-full">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </Button>
          
          <div class="grid grid-cols-2 gap-3">
            <Button variant="outline" href="/" className="w-full">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Button>
            
            <Button variant="outline" href="/categories" className="w-full">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse
            </Button>
          </div>
        </div>
        
        <!-- Advanced Options -->
        <div class="border-t border-neutral-200 pt-4">
          <button
            type="button"
            on:click={toggleDetails}
            class="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200 mb-3"
          >
            {showDetails ? 'Hide' : 'Show'} technical details
          </button>
          
          {#if showDetails}
            <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
              <h4 class="text-sm font-semibold text-neutral-800 mb-2">Technical Information</h4>
              <div class="space-y-2 text-xs text-neutral-600">
                <div><strong>Error ID:</strong> {errorId}</div>
                <div><strong>Calculator:</strong> {calculatorName || 'Unknown'}</div>
                <div><strong>Timestamp:</strong> {timestamp}</div>
                <div><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Unknown'}</div>
                {#if errorStack}
                  <div class="mt-3">
                    <strong>Stack Trace:</strong>
                    <pre class="mt-1 text-xs bg-neutral-100 p-2 rounded overflow-x-auto">{errorStack}</pre>
                  </div>
                {/if}
              </div>
            </div>
            
            <div class="flex space-x-2">
              <Button variant="outline" size="sm" on:click={copyErrorDetails}>
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Details
              </Button>
              
              <Button variant="outline" size="sm" on:click={reportError}>
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Report Issue
              </Button>
            </div>
          {/if}
        </div>
        
        <!-- Troubleshooting Tips -->
        <div class="mt-6 pt-4 border-t border-neutral-200">
          <h3 class="text-sm font-semibold text-neutral-900 mb-3">
            Troubleshooting Tips
          </h3>
          <ul class="text-xs text-neutral-600 space-y-2">
            <li class="flex items-start">
              <svg class="w-3 h-3 mt-0.5 mr-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Check that all required fields are filled correctly
            </li>
            <li class="flex items-start">
              <svg class="w-3 h-3 mt-0.5 mr-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Ensure numbers are within valid ranges
            </li>
            <li class="flex items-start">
              <svg class="w-3 h-3 mt-0.5 mr-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Try refreshing the page
            </li>
            <li class="flex items-start">
              <svg class="w-3 h-3 mt-0.5 mr-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Clear your browser cache if issues persist
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
{:else}
  <slot />
{/if}

<style>
  /* Component-specific styles using design tokens */
  .error-boundary {
    background-color: var(--color-neutral-50);
  }
  
  code {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    background-color: var(--color-neutral-100);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--border-radius-sm);
  }
  
  pre {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    line-height: var(--line-height-normal);
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>