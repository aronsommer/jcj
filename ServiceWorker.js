const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/6cc3d1c25a02076cce0b09ae62036b93.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/87c2fe9622e407a62025bc39ff57c019.data",
    "Build/0e5d58b2b66c677bc68d63da65c43f1a.wasm",
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
