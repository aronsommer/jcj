const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/b650ddad9b4c367a6e90fb16d47e9865.loader.js",
    "Build/0db7ba5a1f13be59b8e31ef9c706b3f6.framework.js",
    "Build/ef4bf3b5e7f4a78830f9e9cc5ea545eb.data",
    "Build/e72ff306fb39a457f20633638d1941d1.wasm",
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
