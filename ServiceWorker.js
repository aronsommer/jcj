const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/52dc34d395e4ef47e5cdba477a5accb1.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/1a01793129a642a382743ffe856375a0.data",
    "Build/55d19104d6e75b5d61002b8f50f1f36a.wasm",
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
