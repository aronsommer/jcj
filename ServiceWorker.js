const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/7e867817d6b25bcf723ed910bfb1241b.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/e6a1a6fc962b2b8fac1bc656136be569.data",
    "Build/9b4ba91f4b77ae86b00bbf18f7d069d0.wasm",
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
