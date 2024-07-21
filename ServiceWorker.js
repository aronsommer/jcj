const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/b1606c27c9e806f9cd78fd7ff758ccea.loader.js",
    "Build/b7f83ab8200ee1cf956413d4336e9d4b.framework.js",
    "Build/36209cc572494bb9ad5b32b9998abc83.data",
    "Build/4c96d1246253103a92d4e92fcc74ad6b.wasm",
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
