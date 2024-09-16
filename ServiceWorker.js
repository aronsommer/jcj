const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/cc969e1533209682d990c22c83c19b44.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/81fd92deed2ccfcbf074a89c07a1a184.data",
    "Build/7231eb67ca4f28412c1e815ccb82174a.wasm",
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
