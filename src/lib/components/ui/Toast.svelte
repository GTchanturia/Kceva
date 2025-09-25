<script>
  /**
   * Toast Notification Component
   * Displays temporary notifications with proper accessibility
   */
  
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  /** @type {'success' | 'error' | 'warning' | 'info'} */
  export let type = 'info';
  
  /** @type {string} */
  export let title = '';
  
  /** @type {string} */
  export let message = '';
  
  /** @type {number} */
  export let duration = 5000;
  
  /** @type {boolean} */
  export let dismissible = true;
  
  /** @type {string} */
  export let id = '';
  
  let timeoutId;
  let progressWidth = 100;
  let progressInterval;
  
  // Auto-dismiss after duration
  onMount(() => {
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        dismiss();
      }, duration);
      
      // Animate progress bar
      const startTime = Date.now();
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progressWidth = Math.max(0, 100 - (elapsed / duration) * 100);
        
        if (progressWidth <= 0) {
          clearInterval(progressInterval);
        }
      }, 50);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);
    };
  });
  
  function dismiss() {
    dispatch('dismiss', { id });
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      dismiss();
    }
  }
  
  // Get type-specific styles
  $: typeStyles = {
    success: {
      bg: 'bg-success-50',
      border: 'border-success-200',
      text: 'text-success-800',
      icon: 'text-success-600',
      progress: 'bg-success-500'
    },
    error: {
      bg: 'bg-error-50',
      border: 'border-error-200',
      text: 'text-error-800',
      icon: 'text-error-600',
      progress: 'bg-error-500'
    },
    warning: {
      bg: 'bg-warning-50',
      border: 'border-warning-200',
      text: 'text-warning-800',
      icon: 'text-warning-600',
      progress: 'bg-warning-500'
    },
    info: {
      bg: 'bg-info-50',
      border: 'border-info-200',
      text: 'text-info-800',
      icon: 'text-info-600',
      progress: 'bg-info-500'
    }
  }[type];
  
  // Get type-specific icon
  $: iconPath = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }[type];
</script>

<div
  class="toast-container max-w-sm w-full {typeStyles.bg} {typeStyles.border} border rounded-lg shadow-lg pointer-events-auto overflow-hidden"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  transition:fly={{ y: -50, duration: 300 }}
  on:keydown={handleKeydown}
  tabindex="-1"
>
  <!-- Progress Bar -->
  {#if duration > 0}
    <div class="h-1 {typeStyles.progress} transition-all duration-75 ease-linear" style="width: {progressWidth}%"></div>
  {/if}
  
  <!-- Content -->
  <div class="p-4">
    <div class="flex items-start">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 {typeStyles.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPath} />
        </svg>
      </div>
      
      <!-- Message Content -->
      <div class="ml-3 flex-1">
        {#if title}
          <h3 class="text-sm font-semibold {typeStyles.text}">
            {title}
          </h3>
        {/if}
        
        {#if message}
          <p class="text-sm {typeStyles.text} {title ? 'mt-1' : ''}">
            {message}
          </p>
        {/if}
        
        <!-- Slot for custom content -->
        <slot />
      </div>
      
      <!-- Dismiss Button -->
      {#if dismissible}
        <div class="ml-4 flex-shrink-0">
          <button
            type="button"
            class="inline-flex {typeStyles.text} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md p-1"
            on:click={dismiss}
            aria-label="Dismiss notification"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .toast-container {
    z-index: var(--z-index-toast);
  }
  
  /* Ensure proper stacking and positioning */
  :global(.toast-wrapper) {
    position: fixed;
    top: var(--space-4);
    right: var(--space-4);
    z-index: var(--z-index-toast);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    pointer-events: none;
  }
  
  :global(.toast-wrapper .toast-container) {
    pointer-events: auto;
  }
  
  @media (max-width: 640px) {
    :global(.toast-wrapper) {
      top: var(--space-2);
      right: var(--space-2);
      left: var(--space-2);
    }
    
    .toast-container {
      max-width: none;
    }
  }
</style>