<script>
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: "All Calculators", href: "/categories" },
      { label: "Education", href: "/education" },
    ],
    company: [
      { label: "About Us", href: "/about" },
    ],
  };
</script>

<footer class="bg-gray-50 border-t border-gray-200 mt-auto">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Brand -->
      <div>
        <a href="/" class="flex items-center gap-2 mb-4" aria-label="kceva home">
          <img
            src="/logo.png"
            alt="kceva logo"
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
            class="w-8 h-8 rounded-lg object-cover"
          />
          <span class="text-lg font-bold text-gray-900">kceva</span>
        </a>
        <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
          100+ free online calculators and converters. Fast, accurate, and private — no sign-up required.
        </p>
        <p class="text-xs text-gray-400 mt-4">© {currentYear} kceva. All rights reserved.</p>
      </div>

      <!-- Product Links -->
      <div>
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
        <ul class="space-y-2.5">
          {#each links.product as link}
            <li>
              <a href={link.href} class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company Links -->
      <div>
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
        <ul class="space-y-2.5">
          {#each links.company as link}
            <li>
              <a href={link.href} class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

    </div>
  </div>
</footer>
