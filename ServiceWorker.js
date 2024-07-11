const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/9b3c86786aa0ffedcc5324910bc6f20a.loader.js",
    "Build/54efe36dfe6649e18a7e5d221a88f15b.framework.js",
    "Build/862838d197b4c5cd06aaa5ac9f2a8e00.data",
    "Build/25e971746fc668245bf1ec12aff2bbf0.wasm",
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
