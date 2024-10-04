const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/52915197160e3d11db3bf98d744634a4.loader.js",
    "Build/314a1963d2fda648ac21dda0119f14e9.framework.js",
    "Build/da62304371b512f43530433e11cf45d7.data",
    "Build/b89298b1899e7c81d7ef2f07b316c4b1.wasm",
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
