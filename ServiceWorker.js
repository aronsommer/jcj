const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/1b56a248a5ea796576aa8df24eed53f1.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/f0563dda5ea55603a96d146ce8b4c096.data",
    "Build/cbc24640b80940f49963b58d21b8a3eb.wasm",
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
