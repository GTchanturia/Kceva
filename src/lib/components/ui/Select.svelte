<script>
  /**
   * Enhanced Select Component with improved styling and accessibility
   * @component
   */
  
  /** @type {string} */
  export let label = '';
  
  /** @type {string} */
  export let value = '';
  
  /** @type {Array<{value: string, label: string}>} */
  export let options = [];
  
  /** @type {boolean} */
  export let required = false;
  
  /** @type {boolean} */
  export let disabled = false;
  
  /** @type {string} */
  export let error = '';
  
  /** @type {string} */
  export let id = '';
  
  /** @type {string} */
  export let name = '';
  
  /** @type {string} */
  export let placeholder = 'Select an option';
  
  /** @type {string} */
  export let helpText = '';
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {string} */
  export let className = '';
  
  // Generate unique ID if not provided
  import { generateId } from '$lib/utils/helpers.js';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  $: selectId = id || generateId('select');
  $: helpTextId = helpText ? `${selectId}-help` : undefined;
  $: errorId = error ? `${selectId}-error` : undefined;
  
  // Enhanced select classes
  $: selectClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-primary-500 focus:border-primary-500 
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
    transition-colors duration-200 ease-in-out
    appearance-none bg-white
    ${error ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : 'border-neutral-300'}
    ${loading ? 'pr-10' : 'pr-8'}
    ${className}
  `.trim().replace(/\s+/g, ' ');
</script>

<div class="space-y-1">
  {#if label}
    <label for={selectId} class="block text-sm font-medium text-gray-700">
      {label}
      {#if required}
        <span class="text-error-500 ml-1" aria-label="required">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="relative">
    <select
      {required}
      {disabled}
      {name}
      id={selectId}
      bind:value
      class={selectClasses}
      aria-describedby={[helpTextId, errorId].filter(Boolean).join(' ') || undefined}
      aria-invalid={error ? 'true' : 'false'}
      on:change
      on:focus
      on:blur
    >
      {#if placeholder}
        <option value="" disabled selected={!value}>{placeholder}</option>
      {/if}
      
      {#each options as option}
        <option value={option.value} disabled={option.disabled || false}>
          {option.label}
        </option>
      {/each}
    </select>
    
    <!-- Dropdown Arrow or Loading -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      {#if loading}
        <LoadingSpinner size="sm" color="gray" showMessage={false} />
      {:else}
        <svg class="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      {/if}
    </div>
  </div>
  
  <!-- Help Text -->
  {#if helpText}
    <p id={helpTextId} class="text-sm text-neutral-500">
      {helpText}
    </p>
  {/if}
  
  <!-- Error Message -->
  {#if error}
    <p id={errorId} class="text-sm text-error-600 flex items-center" role="alert">
      <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      {error}
    </p>
  {/if}
</div>

<style>
  /* Enhanced select styles using design tokens */
  select {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
    height: var(--input-height);
    background-image: none; /* Remove default arrow */
  }
  
  select:focus {
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
  }
  
  select[aria-invalid="true"]:focus {
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }
  
  /* Custom dropdown arrow positioning */
  select {
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1rem;
  }
  
  /* Focus visible styles */
  select:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
</style>