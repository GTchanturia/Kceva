<script>
  /**
   * Loading Spinner Component
   * Accessible loading indicator for calculator operations
   */
  
  /** @type {string} */
  export let size = 'md';
  
  /** @type {string} */
  export let color = 'blue';
  
  /** @type {string} */
  export let message = 'Loading...';
  
  /** @type {boolean} */
  export let showMessage = true;
  
  $: sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  $: colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500'
  };
</script>

<div class="flex items-center justify-center space-x-3" role="status" aria-live="polite">
  <div 
    class="animate-spin rounded-full border-2 border-gray-200 {sizeClasses[size]} {colorClasses[color]}"
    style="border-top-color: transparent;"
    aria-hidden="true"
  ></div>
  
  {#if showMessage}
    <span class="text-sm text-gray-600 font-medium">
      {message}
    </span>
  {/if}
  
  <span class="sr-only">{message}</span>
</div>

<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>