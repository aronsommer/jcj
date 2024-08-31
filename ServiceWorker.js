const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/05c2fc706d426929bd48d0d1cb2d0482.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/e702765f6d799bd9de2666787f0ab649.data",
    "Build/db163656eb729b21ef408aa3d1b23f67.wasm",
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
