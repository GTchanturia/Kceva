<script>
  import { page } from "$app/stores";

  let mobileMenuOpen = false;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/education", label: "Education" },
    { href: "/about", label: "About" },
  ];

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Close menu on navigation
  $: if ($page.url.pathname) {
    mobileMenuOpen = false;
  }
</script>

<header class="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">

      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="flex items-center gap-2.5 group" aria-label="kceva home">
          <img
            src="/logo.png"
            alt="kceva logo"
            width="32"
            height="32"
            loading="eager"
            decoding="async"
            class="w-8 h-8 rounded-lg object-cover"
          />
          <span class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            kceva
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
        {#each navItems as item}
          <a
            href={item.href}
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors {
              $page.url.pathname === item.href
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }"
            aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        on:click={toggleMenu}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {#if mobileMenuOpen}
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <nav id="mobile-menu" class="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1" aria-label="Mobile navigation">
        {#each navItems as item}
          <a
            href={item.href}
            class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors {
              $page.url.pathname === item.href
                ? 'bg-blue-50 text-blue-600'
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
