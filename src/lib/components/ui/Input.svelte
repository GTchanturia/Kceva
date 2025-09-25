<script>
  /**
   * Enhanced Input Component with validation and accessibility
   * @component
   */
  
  /** @type {string} */
  export let type = 'text';
  
  /** @type {string} */
  export let placeholder = '';
  
  /** @type {string} */
  export let label = '';
  
  /** @type {string} */
  export let value = '';
  
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
  export let helpText = '';
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {string} */
  export let icon = '';
  
  /** @type {'left' | 'right'} */
  export let iconPosition = 'left';
  
  /** @type {number} */
  export let min = undefined;
  
  /** @type {number} */
  export let max = undefined;
  
  /** @type {number} */
  export let step = undefined;
  
  /** @type {string} */
  export let className = '';
  
  // Generate unique ID if not provided
  import { generateId } from '$lib/utils/helpers.js';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  $: inputId = id || generateId('input');
  $: helpTextId = helpText ? `${inputId}-help` : undefined;
  $: errorId = error ? `${inputId}-error` : undefined;
  
  // Enhanced input classes
  $: inputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400 
    focus:outline-none focus:ring-primary-500 focus:border-primary-500 
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
    transition-colors duration-200 ease-in-out
    ${error ? 'border-error-300 focus:ring-error-500 focus:border-error-500' : 'border-neutral-300'}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${loading ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
</script>

<div class="space-y-1">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="relative">
    <!-- Left Icon -->
    {#if icon && iconPosition === 'left'}
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon} />
        </svg>
      </div>
    {/if}
    
    <!-- Input Element -->
    <input
      {type}
      {placeholder}
      {required}
      {disabled}
      {name}
      {min}
      {max}
      {step}
      id={inputId}
      bind:value
      class={inputClasses}
      aria-describedby={[helpTextId, errorId].filter(Boolean).join(' ') || undefined}
      aria-invalid={error ? 'true' : 'false'}
      on:input
      on:change
      on:blur
      on:focus
      on:keydown
    />
    
    <!-- Right Icon or Loading -->
    {#if loading}
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <LoadingSpinner size="sm" color="gray" showMessage={false} />
      </div>
    {:else if icon && iconPosition === 'right'}
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon} />
        </svg>
      </div>
    {/if}
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
  /* Enhanced input styles using design tokens */
  input {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
    height: var(--input-height);
  }
  
  input:focus {
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
  }
  
  input[aria-invalid="true"]:focus {
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }
  
  /* Number input spinner styling */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  /* Enhanced focus styles */
  input:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
</style>