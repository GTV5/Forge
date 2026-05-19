// FORGE Service Worker - v1
// Forces fresh reload on every update

const CACHE_NAME = 'forge-v1';

// Install - don't cache anything, always fetch fresh
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Activate - clear all old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Fetch - always go to network, never serve from cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, {cache: 'no-store'}).catch(() =>
      caches.match(e.request)
    )
  );
});
