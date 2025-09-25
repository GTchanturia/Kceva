<script>
  /**
   * Enhanced Card Component with variants and improved accessibility
   * @component
   */
  
  /** @type {string} */
  export let className = '';
  
  /** @type {boolean} */
  export let hover = false;
  
  /** @type {'default' | 'elevated' | 'outlined' | 'filled'} */
  export let variant = 'default';
  
  /** @type {'sm' | 'md' | 'lg'} */
  export let padding = 'md';
  
  /** @type {boolean} */
  export let interactive = false;
  
  /** @type {string} */
  export let as = 'div';
  
  // Enhanced card classes with design tokens
  $: variantClasses = {
    default: 'bg-white border border-neutral-200 shadow-sm',
    elevated: 'bg-white border border-neutral-200 shadow-lg',
    outlined: 'bg-white border-2 border-neutral-300 shadow-none',
    filled: 'bg-neutral-50 border border-neutral-200 shadow-none'
  }[variant];
  
  $: paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[padding];
  
  $: interactiveClasses = interactive || hover ? 
    'hover:shadow-lg hover:border-neutral-300 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer' : 
    '';
  
  $: cardClasses = `
    rounded-xl overflow-hidden
    ${variantClasses}
    ${interactiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
</script>

<svelte:element 
  this={as}
  class={cardClasses}
  role={interactive ? 'button' : undefined}
  tabindex={interactive ? 0 : undefined}
  on:click
  on:keydown
>
  <div class={paddingClasses}>
    <slot />
  </div>
</svelte:element>

<style>
  /* Enhanced card styles using design tokens */
  :global(.card) {
    background-color: var(--color-neutral-0);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
  }
  
  :global(.card:hover) {
    box-shadow: var(--shadow-md);
  }
  
  /* Interactive card focus styles */
  [role="button"]:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  /* Card content spacing */
  :global(.card-header) {
    margin-bottom: var(--space-4);
  }
  
  :global(.card-footer) {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-neutral-200);
  }
</style>