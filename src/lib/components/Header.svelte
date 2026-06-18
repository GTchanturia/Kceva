<script>
  import { page } from '$app/stores';
  import Icon from '$lib/components/Icon.svelte';

  let mobileMenuOpen = false;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/education', label: 'Education' },
    { href: '/about', label: 'About' },
  ];

  $: if ($page.url.pathname) {
    mobileMenuOpen = false;
  }
</script>

<header class="bg-white border-b border-gray-200 sticky top-0 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-14">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group" aria-label="kceva home">
        <img src="/logo.png" alt="kceva" width="28" height="28" loading="eager" class="w-7 h-7 rounded object-cover" />
        <span class="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">kceva</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center" aria-label="Primary">
        {#each navItems as item}
          <a
            href={item.href}
            class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors {
              $page.url.pathname === item.href
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }"
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {#if mobileMenuOpen}
          <Icon name="close" size={18} strokeWidth={2} />
        {:else}
          <Icon name="menu" size={18} strokeWidth={2} />
        {/if}
      </button>
    </div>

    <!-- Mobile Nav -->
    {#if mobileMenuOpen}
      <nav id="mobile-menu" class="md:hidden border-t border-gray-100 py-2 space-y-0.5" aria-label="Mobile">
        {#each navItems as item}
          <a
            href={item.href}
            class="block px-3 py-2 text-sm font-medium rounded-md transition-colors {
              $page.url.pathname === item.href
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }"
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</header>
