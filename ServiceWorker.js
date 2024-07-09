const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/f332dce96d543ded232d0c18d7db9426.loader.js",
    "Build/d759be48b22d0ea6b9c1f0b096dd923c.framework.js",
    "Build/e04c6ebe77fb5efcfdec9f890165968f.data",
    "Build/c0f769d672a634b9e834aabaa40e7861.wasm",
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
