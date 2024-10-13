const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/23de2a3cf9618bbbe2a69fb93e7ce8a4.loader.js",
    "Build/77372dad85774c963347dcc519fe21d1.framework.js",
    "Build/ee60c634090a3985eedfb669ce98829d.data",
    "Build/883948b82cb060d948230c877c666aa9.wasm",
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
