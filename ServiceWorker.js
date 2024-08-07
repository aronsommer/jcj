const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/4c7b406818faaff9575fee2dbfdd0bee.loader.js",
    "Build/0db7ba5a1f13be59b8e31ef9c706b3f6.framework.js",
    "Build/2294e86f804339d205b2c574342caf0e.data",
    "Build/fd92b37f92e91fff97689a02ef0ab29c.wasm",
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
