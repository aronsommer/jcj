const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/dcd910a970115a74b6a64e356f720bc6.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/6defeeecd0f4e8052fd7428f747da2a8.data",
    "Build/ea47adb4d850ce00049256c8edd2d12d.wasm",
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
