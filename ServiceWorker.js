const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/0bfc0e2209d1a0d4fb70658b3bd85239.loader.js",
    "Build/0db7ba5a1f13be59b8e31ef9c706b3f6.framework.js",
    "Build/2858cdf23e420fb5747dc7236f23e4e5.data",
    "Build/b06cc8a0505fab6f4144cf9d68fca30a.wasm",
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
