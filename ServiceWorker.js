const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/897b913a35ff9d08471a7fc0eedcffe5.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/bb5095e381d2d12d297a81005cf80ce5.data",
    "Build/623f9cd81209c5543da6fda7fda2294d.wasm",
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
