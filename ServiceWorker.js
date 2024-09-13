const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/15d517deda65d95b6eb27d5a4ba666fc.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/27e7c6b05422eb4acb0552853057fcb9.data",
    "Build/5bcb3a9d7753457bb3b4dcc8688eacb9.wasm",
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
