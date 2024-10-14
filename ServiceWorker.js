const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/5ca1bf5f846a17215aa2c784c5bc8c34.loader.js",
    "Build/77372dad85774c963347dcc519fe21d1.framework.js",
    "Build/0e6548b2390d4545b35095bb32461bfd.data",
    "Build/9280f5f4e72f6bd05ab7a172743fdaf2.wasm",
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
