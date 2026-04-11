const CACHE_NAME = "criadero-az-v20260411-001";
const urlsToCache = ["/criadero-aguas-zapallar/"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request, {cache: "no-store"}).catch(() =>
      caches.match(event.request)
    )
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.action === "skipWaiting") self.skipWaiting();
});
