const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/87e8349bfcdd93bf0a53566112a46251.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/c55b61558e8ce6d50c1d733f18807411.data",
    "Build/12045df3703d97c06a39ceb1b8b9f42b.wasm",
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
