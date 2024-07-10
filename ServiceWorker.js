const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/f4c5aa28778deb8750e702f272c4d66d.loader.js",
    "Build/a3019f6587ab5cb227d0fc9984797128.framework.js",
    "Build/7fe1c279139ab26777d4d857fc2e1c72.data",
    "Build/cc047b9f7ea9291878a4163a8e87ec30.wasm",
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
