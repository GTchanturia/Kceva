@@ .. @@
      <!-- Navigation items -->
      const navItems = [
        { href: "/", label: "Home" },
        { href: "/categories", label: "Categories" },
        { href: "/education", label: "Education" },
        { href: "/about", label: "About" },
      ];

@@ .. @@
       <!-- Logo and Brand -->
       <div class="flex items-center space-x-4">
         <a href="/" class="flex items-center space-x-2" aria-label="Kceva home">
           <img
             src="/logo.png"
             alt="Kceva logo"
             width="64"
             height="64"
             loading="eager"
             decoding="async"
             class="w-8 h-8 rounded-lg object-cover"
           />
           <span class="text-xl font-bold text-gray-900 hidden sm:block">
             kceva
           </span>
         </a>
       </div>