/// <reference lib="webworker" />
// @ts-check

const CACHE_NAME = 'kceva-v2';
const STATIC_ASSETS = self.__WB_MANIFEST || [];

const FALLBACK_STATIC = [
  '/',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(
        FALLBACK_STATIC.map((url) =>
          typeof url === 'string' ? url : url.url
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip non-same-origin requests (API calls, etc.)
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(
      (cached) => cached || fetch(event.request)
    )
  );
});
