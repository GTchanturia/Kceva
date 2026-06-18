/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  // No per-layout SEO — each page owns its <svelte:head> directly.
  return {};
}
