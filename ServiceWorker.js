const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/61876681f19cac68dd440fda61c2043c.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/e0ea21253daa7d07bb578e19cf7864ff.data",
    "Build/74cd35fb878998ea2181b4ff82f6c295.wasm",
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
