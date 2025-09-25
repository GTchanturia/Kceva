@@ .. @@
 <script>
   /**
-   * Loading Spinner Component
-   * Accessible loading indicator for calculator operations
+   * Enhanced Loading Spinner Component
+   * Accessible loading indicator with improved animations and variants
    */
   
   /** @type {string} */
   export let size = 'md';
   
   /** @type {string} */
   export let color = 'blue';
   
   /** @type {string} */
   export let message = 'Loading...';
   
   /** @type {boolean} */
   export let showMessage = true;
   
-  $: sizeClasses = {
-    sm: 'w-4 h-4',
-    md: 'w-6 h-6',
-    lg: 'w-8 h-8',
-    xl: 'w-12 h-12'
-  };
+  /** @type {'spinner' | 'dots' | 'pulse'} */
+  export let variant = 'spinner';
+  
+  /** @type {boolean} */
+  export let inline = false;
   
-  $: colorClasses = {
-    blue: 'border-blue-500',
-    green: 'border-green-500',
-    purple: 'border-purple-500',
-    gray: 'border-gray-500'
-  };
+  $: sizeClasses = {
+    sm: 'w-4 h-4',
+    md: 'w-6 h-6', 
+    lg: 'w-8 h-8',
+    xl: 'w-12 h-12'
+  }[size];
+  
+  $: colorClasses = {
+    blue: 'text-primary-600',
+    green: 'text-success-600',
+    purple: 'text-purple-600',
+    gray: 'text-neutral-600'
+  }[color];
 </script>
 
-<div class="flex items-center justify-center space-x-3" role="status" aria-live="polite">
-  <div 
-    class="animate-spin rounded-full border-2 border-gray-200 {sizeClasses[size]} {colorClasses[color]}"
-    style="border-top-color: transparent;"
-    aria-hidden="true"
-  ></div>
+<div 
+  class="flex items-center {inline ? 'inline-flex' : 'justify-center'} space-x-3" 
+  role="status" 
+  aria-live="polite"
+>
+  {#if variant === 'spinner'}
+    <div 
+      class="animate-spin rounded-full border-2 border-neutral-200 {sizeClasses} {colorClasses}"
+      style="border-top-color: currentColor;"
+      aria-hidden="true"
+    ></div>
+  {:else if variant === 'dots'}
+    <div class="flex space-x-1" aria-hidden="true">
+      <div class="w-2 h-2 {colorClasses} rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
+      <div class="w-2 h-2 {colorClasses} rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
+      <div class="w-2 h-2 {colorClasses} rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
+    </div>
+  {:else if variant === 'pulse'}
+    <div 
+      class="{sizeClasses} {colorClasses} rounded-full animate-pulse"
+      style="background-color: currentColor; opacity: 0.6;"
+      aria-hidden="true"
+    ></div>
+  {/if}
   
   {#if showMessage}
     <span class="text-sm text-neutral-600 font-medium">
       {message}
     </span>
   {/if}
   
   <span class="sr-only">{message}</span>
 </div>
 
 <style>
-  @keyframes spin {
-    to {
-      transform: rotate(360deg);
-    }
-  }
-  
-  .animate-spin {
-    animation: spin 1s linear infinite;
+  /* Enhanced animations using design tokens */
+  .animate-spin {
+    animation: spin 1s linear infinite;
+  }
+  
+  .animate-bounce {
+    animation: bounce 1s infinite;
+  }
+  
+  .animate-pulse {
+    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
+  }
+  
+  @keyframes spin {
+    from { transform: rotate(0deg); }
+    to { transform: rotate(360deg); }
+  }
+  
+  @keyframes bounce {
+    0%, 100% {
+      transform: translateY(-25%);
+      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
+    }
+    50% {
+      transform: none;
+      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
+    }
+  }
+  
+  @keyframes pulse {
+    0%, 100% { opacity: 1; }
+    50% { opacity: 0.5; }
   }
 </style>