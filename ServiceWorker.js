const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/518505405952e64281c7add47cd5606e.loader.js",
    "Build/ae059025020f74f4119c6d31000bae02.framework.js",
    "Build/e6268c8e4d6a4dc888677719bfb60caa.data",
    "Build/4bb20f8f034b63cbb593522bf9e26dfb.wasm",
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
