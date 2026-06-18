<script>
  const year = new Date().getFullYear();

  const cols = [
    {
      title: 'Calculators',
      links: [
        { label: 'Finance', href: '/category/finance' },
        { label: 'Health & Fitness', href: '/category/health' },
        { label: 'Math & Geometry', href: '/category/math' },
        { label: 'Unit Converters', href: '/category/conversion' },
        { label: 'Date & Time', href: '/category/datetime' },
      ]
    },
    {
      title: 'More Tools',
      links: [
        { label: 'Tech & IT', href: '/category/tech' },
        { label: 'Design & Graphics', href: '/category/design' },
        { label: 'Lifestyle', href: '/category/lifestyle' },
        { label: 'Fun Tools', href: '/category/fun' },
        { label: 'Education', href: '/education' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'All Categories', href: '/categories' },
      ]
    }
  ];
</script>

<footer class="bg-white border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">

      <!-- Brand -->
      <div class="col-span-2 md:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-3">
          <img src="/logo.png" alt="kceva" width="24" height="24" loading="lazy" class="w-6 h-6 rounded object-cover" />
          <span class="text-sm font-bold text-gray-900">kceva</span>
        </a>
        <p class="text-xs text-gray-500 leading-relaxed max-w-[200px]">
          Free online calculators and converters. No sign-up required.
        </p>
        <p class="text-xs text-gray-400 mt-4">© {year} kceva</p>
      </div>

      <!-- Links -->
      {#each cols as col}
        <div>
          <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">{col.title}</h3>
          <ul class="space-y-2">
            {#each col.links as link}
              <li>
                <a href={link.href} class="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}

    </div>
  </div>
</footer>
