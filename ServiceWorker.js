const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/082b3955661b258d1a2ca2aa5d5995ab.loader.js",
    "Build/d0b83179f2289221b6740a7e7d8f6188.framework.js",
    "Build/167f94a93b84c2dab80ef8fbdd802266.data",
    "Build/1f8d1753f0a0f9d74b6823987efe5307.wasm",
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
