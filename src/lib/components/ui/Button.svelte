<script>
  /**
   * Enhanced Button Component with improved accessibility and variants
   * @component
   */
  
  /** @type {'primary' | 'secondary' | 'outline' | 'ghost'} */
  export let variant = 'primary';
  
  /** @type {'sm' | 'md' | 'lg'} */
  export let size = 'md';
  
  /** @type {boolean} */
  export let disabled = false;
  
  /** @type {string} */
  export let type = 'button';
  
  /** @type {string} */
  export let href = '';
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {string} */
  export let loadingText = 'Loading...';
  
  /** @type {boolean} */
  export let fullWidth = false;
  
  /** @type {string} */
  export let className = '';
  
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  // Enhanced base classes with design tokens
  $: baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  $: variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
    secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 active:bg-neutral-800 shadow-sm hover:shadow-md',
    outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-400',
    ghost: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 hover:text-neutral-900'
  }[variant];
  
  $: sizeClasses = {
    sm: 'px-3 py-1.5 text-sm h-8 min-w-[2rem]',
    md: 'px-4 py-2 text-sm h-10 min-w-[2.5rem]',
    lg: 'px-6 py-3 text-base h-12 min-w-[3rem]'
  }[size];
  
  $: classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  // Handle click with loading state
  function handleClick(event) {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    // Dispatch click event for parent components
  }
</script>

{#if href}
  <a 
    {href} 
    class={classes} 
    role="button" 
    tabindex={disabled ? -1 : 0}
    aria-disabled={disabled}
    on:click={handleClick}
  >
    {#if loading}
      <LoadingSpinner size="sm" {color} showMessage={false} inline={true} />
      <span class="ml-2">{loadingText}</span>
    {:else}
      <slot />
    {/if}
  </a>
{:else}
  <button 
    {type} 
    disabled={disabled || loading} 
    class={classes} 
    on:click={handleClick}
    aria-disabled={disabled || loading}
  >
    {#if loading}
      <LoadingSpinner size="sm" {color} showMessage={false} inline={true} />
      <span class="ml-2">{loadingText}</span>
    {:else}
      <slot />
    {/if}
  </button>
{/if}

<style>
  /* Enhanced button styles using design tokens */
  :global(.btn-icon-only) {
    padding: var(--space-2);
    aspect-ratio: 1;
  }
  
  /* Focus ring improvements */
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  /* Loading state improvements */
  button:disabled,
  a[aria-disabled="true"] {
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Hover effects */
  button:not(:disabled):hover,
  a:not([aria-disabled="true"]):hover {
    transform: translateY(-1px);
  }
  
  button:not(:disabled):active,
  a:not([aria-disabled="true"]):active {
    transform: translateY(0);
  }
</style>