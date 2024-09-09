const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/a38b58227fb6013ee30267a3860276a9.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/dd47b3f29b8076b7f190e9ebb732f178.data",
    "Build/3c54ed2c5b03ae0d0466656985802d24.wasm",
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
