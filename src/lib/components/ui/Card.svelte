<script>
  /**
   * Reusable Card Component
   * @component
   */
  
  /** @type {string} */
  export let className = '';
  
  /** @type {boolean} */
  export let hover = false;
  
  $: cardClasses = `bg-white rounded-lg border border-slate-200 shadow-sm ${hover ? 'hover:shadow-lg hover:border-slate-300 transition-all duration-200' : ''} ${className}`;
</script>

<div class={cardClasses}>
  <slot />
</div>

<style>
  /* Additional card-specific styles can go here */
</style>