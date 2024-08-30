const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/cd46e922c673f7f40f78808db748d71c.loader.js",
    "Build/d0b83179f2289221b6740a7e7d8f6188.framework.js",
    "Build/3fff989e163304a355ef892f129816b6.data",
    "Build/613e309b5160d1c5ce09527f9e6c69a0.wasm",
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
