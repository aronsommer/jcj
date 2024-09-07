const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/4fe698576c80dde2f4cd40b4fff404bf.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/bc5fda23ce1bac610f41745d8cf32ccd.data",
    "Build/7fa18c3a7594ff178257f7920cd40e06.wasm",
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
