<script>
  import Icon from '$lib/components/Icon.svelte';
  import { CATEGORY_COLORS } from '$lib/types/calculator.js';

  /** @type {Object} */
  export let category;

  $: colors = CATEGORY_COLORS[category.color] || CATEGORY_COLORS.gray;
</script>

<a
  href="/category/{category.id}"
  class="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-start gap-3 min-w-0">
      <!-- Icon -->
      <div class="flex-shrink-0 w-9 h-9 rounded-md {colors.light} flex items-center justify-center">
        <Icon name={category.icon} size={18} className="{colors.text}" strokeWidth={1.75} />
      </div>

      <!-- Text -->
      <div class="min-w-0">
        <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
          {category.name}
        </h3>
        <p class="text-xs text-gray-500 mt-0.5">
          {category.calculatorCount ?? ''} tools
        </p>
      </div>
    </div>

    <Icon name="arrow_right_small" size={16} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors" strokeWidth={2} />
  </div>

  <p class="mt-3 text-xs text-gray-500 leading-relaxed line-clamp-2">
    {category.description}
  </p>
</a>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
