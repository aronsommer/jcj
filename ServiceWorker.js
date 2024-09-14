const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/56631cc5ffce1a0bdde08e864e4c01cd.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/5afc028b341365548d10cba551e5aa40.data",
    "Build/bc9acc61267fb0055cbefe1f5f2fa050.wasm",
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
