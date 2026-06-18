<script>
  import Icon from '$lib/components/Icon.svelte';
  import { CALCULATOR_CATEGORIES, CATEGORY_COLORS } from '$lib/types/calculator.js';

  /** @type {Object} */
  export let calculator;
  /** @type {boolean} */
  export let featured = false;

  $: category = CALCULATOR_CATEGORIES.find(c => c.id === calculator.category);
  $: colors = CATEGORY_COLORS[category?.color] || CATEGORY_COLORS.gray;
</script>

<a
  href="/calculator/{calculator.id}"
  class="group block bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150 h-full {featured ? 'border-blue-200 bg-blue-50/30' : ''}"
>
  <div class="flex items-start gap-3">
    <!-- Icon -->
    <div class="flex-shrink-0 w-8 h-8 rounded-md {colors.light} flex items-center justify-center">
      <Icon name={category?.icon || 'calculator'} size={16} className="{colors.text}" strokeWidth={1.75} />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2 mb-1">
        <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
          {calculator.name}
        </h3>
        <Icon name="arrow_right_small" size={14} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" strokeWidth={2} />
      </div>
      <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {calculator.description}
      </p>
      {#if calculator.requiresApi}
        <span class="mt-2 inline-block text-xs text-orange-600 font-medium">Live data</span>
      {/if}
    </div>
  </div>
</a>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
