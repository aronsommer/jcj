const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/819e9b00eafdae883b6142608fd37ecb.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/1fc02082ee0edd750efe8611a94f3df4.data",
    "Build/3c079d79ea094cb1278259af093d7599.wasm",
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
