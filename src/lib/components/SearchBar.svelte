<script>
  import { createEventDispatcher } from 'svelte';
  import { debounce } from '$lib/utils/helpers.js';
  import { searchCalculators } from '$lib/data/calculators/index.js';
  import { CALCULATOR_CATEGORIES, CATEGORY_COLORS } from '$lib/types/calculator.js';
  import Icon from '$lib/components/Icon.svelte';

  const dispatch = createEventDispatcher();

  export let value = '';
  export let showResults = false;

  let searchResults = [];
  let activeIndex = -1;
  let isSearching = false;

  const debouncedSearch = debounce((q) => {
    if (q.trim()) {
      isSearching = true;
      searchResults = searchCalculators(q).slice(0, 8);
      showResults = true;
      isSearching = false;
    } else {
      searchResults = [];
      showResults = false;
    }
  }, 200);

  function handleInput() {
    debouncedSearch(value);
    activeIndex = -1;
  }

  function selectResult(calculator) {
    dispatch('select', calculator);
    value = '';
    showResults = false;
    searchResults = [];
    activeIndex = -1;
  }

  function handleClickOutside() {
    showResults = false;
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') { showResults = false; value = ''; return; }
    if (!showResults || !searchResults.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); activeIndex = (activeIndex + 1) % searchResults.length; }
    else if (event.key === 'ArrowUp') { event.preventDefault(); activeIndex = (activeIndex - 1 + searchResults.length) % searchResults.length; }
    else if (event.key === 'Enter' && activeIndex >= 0) { event.preventDefault(); selectResult(searchResults[activeIndex]); }
  }

  function getCategoryIcon(categoryId) {
    const cat = CALCULATOR_CATEGORIES.find(c => c.id === categoryId);
    return cat?.icon || 'calculator';
  }

  function getCategoryColors(categoryId) {
    const cat = CALCULATOR_CATEGORIES.find(c => c.id === categoryId);
    return CATEGORY_COLORS[cat?.color] || CATEGORY_COLORS.gray;
  }
</script>

<div class="relative w-full">
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon name="search" size={16} className="text-gray-400" strokeWidth={2} />
    </div>
    <input
      type="search"
      bind:value
      on:input={handleInput}
      on:keydown={handleKeydown}
      placeholder="Search 100+ calculators…"
      class="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      aria-label="Search calculators"
      role="combobox"
      aria-expanded={showResults}
      aria-controls="search-results"
      aria-autocomplete="list"
    />
  </div>

  {#if showResults && searchResults.length > 0}
    <div
      id="search-results"
      role="listbox"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
    >
      {#each searchResults as result, i}
        {@const colors = getCategoryColors(result.category)}
        <button
          type="button"
          role="option"
          aria-selected={i === activeIndex}
          class="w-full text-left px-3 py-2.5 flex items-center gap-3 transition-colors {i === activeIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}"
          on:click={() => selectResult(result)}
        >
          <div class="flex-shrink-0 w-7 h-7 rounded {colors.light} flex items-center justify-center">
            <Icon name={getCategoryIcon(result.category)} size={14} className={colors.text} strokeWidth={1.75} />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{result.name}</p>
            <p class="text-xs text-gray-500 truncate">{result.description}</p>
          </div>
        </button>
      {/each}
    </div>
  {/if}

  {#if showResults && searchResults.length === 0 && value.trim()}
    <div class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg px-4 py-3">
      <p class="text-sm text-gray-500 text-center">No results for "{value}"</p>
    </div>
  {/if}
</div>

<svelte:window on:click={handleClickOutside} />
