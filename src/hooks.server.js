/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  // Basic security headers — intentionally permissive to allow Googlebot JS rendering,
  // Google Fonts, Vercel Analytics, and exchange-rate API calls.
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // NOTE: Content-Security-Policy is intentionally omitted at the application level.
  // A strict CSP can block Googlebot from rendering JavaScript, preventing indexing.
  // Configure CSP at the CDN/Vercel Edge level if needed.

  return response;
}
