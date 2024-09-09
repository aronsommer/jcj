const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/4fe698576c80dde2f4cd40b4fff404bf.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/18a9abdac2951c5cefb184891ed3fd1d.data",
    "Build/4bd8629da7aa712122e02301f47b0071.wasm",
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
