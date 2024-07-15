const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/3fd780e24c3afbf22884a69b7f0c3016.loader.js",
    "Build/b7f83ab8200ee1cf956413d4336e9d4b.framework.js",
    "Build/e0ef62d02a99d36d6ef33ce70ef75f9c.data",
    "Build/2e890277ff4f9a982ad84f882812959e.wasm",
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
