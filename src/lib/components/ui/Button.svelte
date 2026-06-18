<script>
  /** @type {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} */
  export let variant = 'primary';
  /** @type {'sm' | 'md' | 'lg'} */
  export let size = 'md';
  export let disabled = false;
  export let type = 'button';
  export let href = '';
  export let loading = false;
  export let fullWidth = false;
  export let className = '';

  $: variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 shadow-sm',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm'
  }[variant] || 'bg-blue-600 text-white hover:bg-blue-700';

  $: sizeClasses = {
    sm: 'px-3 py-1.5 text-xs h-7',
    md: 'px-4 py-2 text-sm h-9',
    lg: 'px-5 py-2.5 text-sm h-11'
  }[size] || 'px-4 py-2 text-sm h-9';

  $: classes = [
    'inline-flex items-center justify-center font-medium rounded-md',
    'transition-colors duration-150 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
    variantClasses,
    sizeClasses,
    className
  ].filter(Boolean).join(' ');

  function handleClick(e) {
    if (loading || disabled) e.preventDefault();
  }
</script>

{#if href}
  <a {href} class={classes} aria-disabled={disabled} on:click={handleClick}>
    {#if loading}
      <svg class="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button {type} disabled={disabled || loading} class={classes} on:click={handleClick} on:click>
    {#if loading}
      <svg class="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    {/if}
    <slot />
  </button>
{/if}
