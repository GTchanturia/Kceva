<script>
  /**
   * Search Bar Component for finding calculators
   * @component
   */
  
  import { createEventDispatcher } from 'svelte';
  import { debounce } from '$lib/utils/helpers.js';
  import { searchCalculators } from '$lib/data/calculators.js';
  
  const dispatch = createEventDispatcher();
  
  /** @type {string} */
  export let value = '';
  
  /** @type {boolean} */
  export let showResults = false;
  
  /** @type {Array} */
  let searchResults = [];
  
  /** @type {boolean} */
  let isSearching = false;
  
  // Debounced search function
  const debouncedSearch = debounce((query) => {
    if (query.trim()) {
      isSearching = true;
      searchResults = searchCalculators(query);
      showResults = true;
      isSearching = false;
    } else {
      searchResults = [];
      showResults = false;
    }
  }, 300);
  
  // Handle input changes
  function handleInput() {
    debouncedSearch(value);
  }
  
  // Handle result selection
  function selectResult(calculator) {
    dispatch('select', calculator);
    value = '';
    showResults = false;
    searchResults = [];
  }
  
  // Handle click outside to close results
  function handleClickOutside() {
    showResults = false;
  }
  
  // Handle keyboard navigation
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      showResults = false;
      value = '';
    }
  }
</script>

<div class="relative w-full max-w-md mx-auto">
  <!-- Search Input -->
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <input
      type="text"
      bind:value
      on:input={handleInput}
      on:keydown={handleKeydown}
      placeholder="Search calculators..."
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    
    {#if isSearching}
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      </div>
    {/if}
  </div>
  
  <!-- Search Results Dropdown -->
  {#if showResults && searchResults.length > 0}
    <div class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
      {#each searchResults as result}
        <button
          type="button"
          class="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
          on:click={() => selectResult(result)}
        >
          <div class="flex items-center space-x-3">
            <span class="text-lg">{result.icon}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {result.name}
              </p>
              <p class="text-sm text-gray-500 truncate">
                {result.description}
              </p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {result.category}
            </span>
          </div>
        </button>
      {/each}
    </div>
  {/if}
  
  <!-- No Results Message -->
  {#if showResults && searchResults.length === 0 && value.trim()}
    <div class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-3 text-base ring-1 ring-black ring-opacity-5">
      <p class="text-center text-gray-500 text-sm">No calculators found for "{value}"</p>
    </div>
  {/if}
</div>

<!-- Click outside handler -->
<svelte:window on:click={handleClickOutside} />