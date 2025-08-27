/**
 * SvelteKit Server Hooks
 * Comprehensive security headers with CSP for workers
 */

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      // allow blob and self for workers
      "worker-src 'self' blob:",
      // styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // images
      "img-src 'self' data: https: blob:",
      // fonts
      "font-src 'self' data: https://fonts.gstatic.com",
      // connections
      "connect-src 'self' https://api.exchangerate-api.com https://ipapi.co https://vercel.live https://vitals.vercel-insights.com https://api.openweathermap.org",
      // no frames
      "frame-src 'none'",
      "frame-ancestors 'none'",
      // other restrictions
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ')
  );

  return response;
}