const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/65d49cc4fb6fb6c35fba0b76f46c471a.loader.js",
    "Build/a3019f6587ab5cb227d0fc9984797128.framework.js",
    "Build/ef5ec5919c94a3661f660f70de86d4d6.data",
    "Build/8fca8bb448a5f1aab0a6e56f958985ae.wasm",
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
