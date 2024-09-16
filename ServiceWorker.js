const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/30a96a22de42192736bd948a84c1f834.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/b7a80b3f7e3bafbaa1ac7a29f9932590.data",
    "Build/b70ccc5a7c897c5533ccac4403088696.wasm",
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
