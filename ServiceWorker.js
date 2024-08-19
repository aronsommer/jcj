const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/e2c2d1c50aafb14ccc91cfad22f1ab51.loader.js",
    "Build/2ce07ef34ac12085f6262fad3a26d0de.framework.js",
    "Build/7f7949ecc2aeb2037841911e49b546ba.data",
    "Build/8371f3de33eadb33a6702a6a8356f27d.wasm",
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
