const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/8a9964e733ec83fb8a90c24a1b6144d3.loader.js",
    "Build/2ce07ef34ac12085f6262fad3a26d0de.framework.js",
    "Build/02d2432def32b7ff630020177ebb2347.data",
    "Build/b8f5225193a33a94819f9b98ca513c99.wasm",
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
