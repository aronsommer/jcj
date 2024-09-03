const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/92d7e2c08eb97e65cdb5b0e61e984db1.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/abcd0cb3cdad9231f42f265e70ef88db.data",
    "Build/894dec51a85ad7b41c56470d20d3ef56.wasm",
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
