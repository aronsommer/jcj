const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/30d65de13a5c3f83e909d7c08d0b503d.loader.js",
    "Build/d0b83179f2289221b6740a7e7d8f6188.framework.js",
    "Build/0f25476c007494dc9950181a28c533ac.data",
    "Build/49caecc0a438ba43afb9ddfac367ca12.wasm",
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
