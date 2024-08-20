const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/232134e2a467c0ec60a9c1f1f63689b8.loader.js",
    "Build/2ce07ef34ac12085f6262fad3a26d0de.framework.js",
    "Build/b4268f195788aaa049314f5f0a06a408.data",
    "Build/de6919ed6bd1449cc9981751064ace15.wasm",
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
