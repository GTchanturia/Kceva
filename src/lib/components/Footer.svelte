<script>
  /**
   * Main Footer Component
   * @component
   */
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: 'All Calculators', href: '/categories' },
      { label: 'Featured Tools', href: '/featured' },
      { label: 'API Access', href: '/api' },
      { label: 'Mobile App', href: '/mobile' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' }
    ],
    social: [
      { label: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
      { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
      { label: 'Discord', href: 'https://discord.com', icon: '💬' }
    ]
  };
</script>

<footer class="bg-gray-50 border-t border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      <!-- Brand Section -->
      <div class="lg:col-span-2">
        <div class="flex items-center space-x-2 mb-4">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">🧮</span>
          </div>
          <span class="text-xl font-bold text-gray-900">Kceva</span>
        </div>
        
        <p class="text-gray-600 mb-6 max-w-md">
          Your trusted destination for 100+ free calculators and converters. 
          From financial planning to health metrics, we've got you covered 
          with accurate, easy-to-use tools.
        </p>
        
        <!-- Newsletter Signup -->
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-900">Stay Updated</h4>
          <div class="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <!-- Product Links -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Product
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.product as link}
            <li>
              <a
                href={link.href}
                class="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Company Links -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Company
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.company as link}
            <li>
              <a
                href={link.href}
                class="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Resources Links -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Resources
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.resources as link}
            <li>
              <a
                href={link.href}
                class="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <!-- Bottom Section -->
    <div class="mt-12 pt-8 border-t border-gray-200">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Copyright -->
        <p class="text-gray-500 text-sm">
          © {currentYear} Kceva. All rights reserved.
        </p>
        
        <!-- Social Links -->
        <div class="flex items-center space-x-6">
          {#each footerLinks.social as social}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label={social.label}
            >
              <span class="text-lg">{social.icon}</span>
            </a>
          {/each}
        </div>
        
        <!-- Language/Theme Toggle (Placeholder) -->
        <div class="flex items-center space-x-4">
          <button
            type="button"
            class="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            aria-label="Toggle theme"
          >
            🌙
          </button>
          <select class="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</footer>