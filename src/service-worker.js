const CACHE_NAME = "kceva-cache-v1";
const urlsToCache = [
    "/",
    "/favicon.svg",
    "/favicon-32x32.png",
    "/favicon-16x16.png",
    "/apple-touch-icon.png",

];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.map((name) => name !== CACHE_NAME && caches.delete(name)))
        )
    );
});