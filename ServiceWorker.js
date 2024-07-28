const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/5283cfe01ad14af8efa98bf7649a48cb.loader.js",
    "Build/0db7ba5a1f13be59b8e31ef9c706b3f6.framework.js",
    "Build/46444d7516c3cd30b15b2b09db066105.data",
    "Build/4ee0a68da543ca8bc8ca12a9efc05807.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
