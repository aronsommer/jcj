const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/2b6e44ac023b2eba270ded7eeaf64dc5.loader.js",
    "Build/ae059025020f74f4119c6d31000bae02.framework.js",
    "Build/023f8b9c891afffd8812300e303f6daa.data",
    "Build/d6149fe042f897285e0c0e8f10b61bab.wasm",
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
