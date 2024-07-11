const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/9b3c86786aa0ffedcc5324910bc6f20a.loader.js",
    "Build/54efe36dfe6649e18a7e5d221a88f15b.framework.js",
    "Build/1d178e75e0efb6f539892cbd32887b70.data",
    "Build/d06de3199c7630bf57cda251883466b5.wasm",
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
