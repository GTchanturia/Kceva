<script>
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
  <title>{$page.status} — {$page.error?.message || 'Error'} | kceva</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div class="text-center max-w-md mx-auto">
    <div class="text-8xl font-bold text-blue-600 mb-4">{$page.status}</div>
    <h1 class="text-2xl font-bold text-gray-900 mb-3">
      {$page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
    </h1>
    <p class="text-gray-600 mb-8">
      {$page.error?.message || 'An unexpected error occurred. Please try again.'}
    </p>
    <div class="flex gap-3 justify-center">
      <Button variant="primary" href="/">Go Home</Button>
      <Button variant="outline" href="/categories">Browse Calculators</Button>
    </div>
  </div>
</div>
