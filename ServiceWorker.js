const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/fc5c4ae31ad4a32a2e2b68fab6e2d116.loader.js",
    "Build/b7f83ab8200ee1cf956413d4336e9d4b.framework.js",
    "Build/dccbc7196b949ca4f74d68208c3c7813.data",
    "Build/11deb9633f870a8098fca1b3c473c476.wasm",
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
