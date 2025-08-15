<script>
  /**
   * Main Header Component
   * @component
   */

  import { page } from "$app/stores";
  import SearchBar from "./SearchBar.svelte";
  import Button from "./ui/Button.svelte";
  import { goto } from "$app/navigation";

  /** @type {boolean} */
  let mobileMenuOpen = false;

  // Handle search result selection
  function handleSearchSelect(event) {
    const calculator = event.detail;
    goto(`/calculator/${calculator.id}`);
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Navigation items
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];
</script>

<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo and Brand -->
      <div class="flex items-center space-x-4">
        <a href="/" class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">🧮</span>
          </div>
          <span class="text-xl font-bold text-gray-900 hidden sm:block">
            Kceva
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 {$page
              .url.pathname === item.href
              ? 'text-blue-600 border-b-2 border-blue-600'
              : ''}"
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Search Bar -->
      <div class="flex-1 max-w-lg mx-8 hidden lg:block">
        <SearchBar on:select={handleSearchSelect} />
      </div>

      <!-- User Actions -->
      <div class="flex items-center space-x-4">
        <!-- Search Button for Mobile -->
        <button
          type="button"
          class="lg:hidden p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Search"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          on:click={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {#if mobileMenuOpen}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            {:else}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <div class="md:hidden border-t border-gray-200 py-4">
        <!-- Mobile Search -->
        <div class="px-4 mb-4 lg:hidden">
          <SearchBar on:select={handleSearchSelect} />
        </div>

        <!-- Mobile Navigation -->
        <nav class="space-y-1">
          {#each navItems as item}
            <a
              href={item.href}
              class="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 {$page
                .url.pathname === item.href
                ? 'text-blue-600 bg-blue-50'
                : ''}"
              on:click={() => (mobileMenuOpen = false)}
            >
              {item.label}
            </a>
          {/each}
        </nav>

        <!-- Mobile Auth Buttons -->
        <div
          class="px-4 pt-4 border-t border-gray-200 mt-4 space-y-2 sm:hidden"
        >
          <Button
            variant="ghost"
            size="sm"
            href="/login"
            className="w-full justify-center"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            href="/register"
            className="w-full justify-center"
          >
            Sign Up
          </Button>
        </div>
      </div>
    {/if}
</header>
