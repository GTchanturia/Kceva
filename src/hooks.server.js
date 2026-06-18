/**
 * SvelteKit Server Hooks
 * Security headers compatible with external resources (GA, Fonts, Vercel)
 */

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  // Security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // NOTE: Cross-Origin-Embedder-Policy: require-corp is intentionally removed —
  // it blocks Google Fonts, GA scripts, and third-party images from loading.
  // Cross-Origin-Opener-Policy is set to unsafe-none for the same reason.

  // Content Security Policy — allows GA, Fonts, Vercel, exchange-rate APIs
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // Scripts: self + inline (Svelte) + GA + GTM + Vercel
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      // Workers
      "worker-src 'self' blob:",
      // Styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images
      "img-src 'self' data: https: blob:",
      // Fonts
      "font-src 'self' data: https://fonts.gstatic.com",
      // Connections: APIs + GA + Vercel
      "connect-src 'self' https://api.exchangerate-api.com https://ipapi.co https://api4.ipify.org https://vercel.live https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ')
  );

  return response;
}
