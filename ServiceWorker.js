const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/c2f25f8611884a2144a2d7f2141b23b7.loader.js",
    "Build/a3019f6587ab5cb227d0fc9984797128.framework.js",
    "Build/b4fc660a20b69811cabf6a458701592c.data",
    "Build/a805cfafb2d0aad05c8d68b8438ac8bf.wasm",
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
