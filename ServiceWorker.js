const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/d941d978591d153292dc2670dfb2dfab.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/14449cc2b0908eac9b9da3169b7e6369.data",
    "Build/42bb90b52f8b3b33c6c995b64f0f82d4.wasm",
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
