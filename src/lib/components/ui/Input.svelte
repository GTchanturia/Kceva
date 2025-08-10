<script>
  /**
   * Reusable Input Component
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
  
  // Generate unique ID if not provided
  import { generateId } from '$lib/utils/helpers.js';
  $: inputId = id || generateId('input');
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
  
  <input
    {type}
    {placeholder}
    {required}
    {disabled}
    {name}
    id={inputId}
    bind:value
    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm {error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}"
    on:input
    on:change
    on:blur
    on:focus
  />
  
  {#if error}
    <p class="text-sm text-red-600">{error}</p>
  {/if}
</div>