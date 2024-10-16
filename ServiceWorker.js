const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/45fbb4d405545bd0878ff1d1f9ad7444.loader.js",
    "Build/77372dad85774c963347dcc519fe21d1.framework.js",
    "Build/7434ca9de59948a366924c1d288a0169.data",
    "Build/315f01b1ae9b36d47cd0665fe9ce2d73.wasm",
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
