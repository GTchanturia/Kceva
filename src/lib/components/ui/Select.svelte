<script>
  /**
   * Reusable Select Component
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
  
  // Generate unique ID if not provided
  import { generateId } from '$lib/utils/helpers.js';
  $: selectId = id || generateId('select');
</script>

<div class="space-y-1">
  {#if label}
    <label for={selectId} class="block text-sm font-medium text-gray-700">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <select
    {required}
    {disabled}
    {name}
    id={selectId}
    bind:value
    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm {error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}"
    on:change
  >
    {#if placeholder}
      <option value="" disabled selected={!value}>{placeholder}</option>
    {/if}
    
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  
  {#if error}
    <p class="text-sm text-red-600">{error}</p>
  {/if}
</div>