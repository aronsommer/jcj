const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/11f807bb408f4a31df9092516f9b655d.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/1301b27c7c632d208d10f1d600296c5f.data",
    "Build/9ce6d4eb5f51d7ec085eecf75fd6f6ba.wasm",
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
