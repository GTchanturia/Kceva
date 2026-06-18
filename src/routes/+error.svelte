<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status} — {$page.error?.message || 'Error'} | kceva</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="max-w-lg mx-auto px-4 py-20 text-center">
  <p class="text-6xl font-bold text-gray-200 mb-4">{$page.status}</p>
  <h1 class="text-xl font-bold text-gray-900 mb-2">
    {$page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
  </h1>
  <p class="text-sm text-gray-500 mb-8">
    {$page.error?.message || 'An unexpected error occurred.'}
  </p>
  <div class="flex items-center justify-center gap-3">
    <a href="/" class="text-sm font-medium text-blue-600 hover:text-blue-700">Go home</a>
    <span class="text-gray-300">|</span>
    <a href="/categories" class="text-sm font-medium text-blue-600 hover:text-blue-700">Browse calculators</a>
  </div>
</div>
