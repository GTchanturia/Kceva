<script>
  /**
   * Reusable Button Component
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
  
  // Compute classes based on props
  $: baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  $: variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  $: sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  $: classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
</script>

{#if href}
  <a {href} class={classes} role="button" tabindex="0">
    <slot />
  </a>
{:else}
  <button {type} {disabled} class={classes} on:click>
    <slot />
  </button>
{/if}