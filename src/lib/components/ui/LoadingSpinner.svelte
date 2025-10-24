<script>
   /**
  * Loading Spinner Component
  * Accessible loading indicator for calculator operations
  * Enhanced Loading Spinner Component
  * Accessible loading indicator with improved animations and variants
    */
   
   /** @type {string} */
   export let size = 'md';
   
   /** @type {string} */
   export let color = 'blue';
   
   /** @type {string} */
   export let message = 'Loading...';
   
   /** @type {boolean} */
   export let showMessage = true;
   
 // size and color maps to avoid redeclaring reactive variables
 const sizeMap = {
   sm: 'w-5 h-5',
   md: 'w-7 h-7',
   lg: 'w-10 h-10',
   xl: 'w-12 h-12'
 };
 /** @type {'spinner' | 'dots' | 'pulse'} */
 export let variant = 'spinner';
 
 /** @type {boolean} */
 export let inline = false;
 
 const colorMap = {
   blue: 'text-primary-600',
   green: 'text-success-600',
   purple: 'text-purple-600',
   gray: 'text-neutral-600'
 };
 
 $: sizeClasses = sizeMap[size] || sizeMap.md;
 $: colorClasses = colorMap[color] || colorMap.blue;
</script>

<!-- Wrapper that contains the spinner/dots/pulse and optional message -->
<div class="flex items-center {inline ? 'inline-flex' : 'justify-center'} space-x-3" role="status" aria-live="polite">
  {#if variant === 'spinner'}
    <div
      class="animate-spin rounded-full border-4 border-gray-200 {sizeClasses} {colorClasses}"
      style="border-top-color: transparent;"
      aria-hidden="true"
    ></div>
  {:else if variant === 'dots'}
    <div class="flex space-x-1" aria-hidden="true">
      <div class="w-4 h-4 {colorClasses} rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
      <div class="w-4 h-4 {colorClasses} rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
      <div class="w-4 h-4 {colorClasses} rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
    </div>
  {:else if variant === 'pulse'}
    <div
      class="{sizeClasses} {colorClasses} rounded-full animate-pulse"
      style="background-color: currentColor; opacity: 0.6;"
      aria-hidden="true"
    ></div>
  {/if}

  {#if showMessage}
    <span class="text-sm text-neutral-600 font-medium">
      {message}
    </span>
  {/if}

  <span class="sr-only">{message}</span>
</div>

<style>
/* Keyframes */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Utility animations */
.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>