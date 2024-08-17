const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/18e5642be6cd0b60796387d60a89961e.loader.js",
    "Build/ae059025020f74f4119c6d31000bae02.framework.js",
    "Build/3874d73353101107e3085d0d9a3b2126.data",
    "Build/6d2b9da0973c70686e9dc027808d7435.wasm",
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
