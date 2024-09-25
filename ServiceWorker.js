const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/4cc98b286e41c2979da46866ca47398f.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/44a0b132da537b6e8d8710496db2b1e1.data",
    "Build/fa53b51e151aaab02243f7047ac8d186.wasm",
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
