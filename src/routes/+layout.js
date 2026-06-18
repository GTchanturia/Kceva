// Enable SSR sitewide (default) — but disable prerender on dynamic routes.
// Static pages benefit from prerender; dynamic calculator/category routes use SSR.
export const ssr = true;
export const prerender = false;
