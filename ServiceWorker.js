const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/df5542c57e13847e78c2ed38a5dae819.loader.js",
    "Build/54efe36dfe6649e18a7e5d221a88f15b.framework.js",
    "Build/ce993f784742b596fdc70db96b703d90.data",
    "Build/eb48f9bf04655a06f9a587cee76f5714.wasm",
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
