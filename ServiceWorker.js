const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/f17a50de1e90c9eff9d4273daf4f828c.loader.js",
    "Build/2ce07ef34ac12085f6262fad3a26d0de.framework.js",
    "Build/c22558ee4dab4c293e87286a49342633.data",
    "Build/c32c2b82a0bfd8fc6657886f4ad4ddd6.wasm",
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
