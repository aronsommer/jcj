const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/6572af8254675c5b72a07abb9654ca92.loader.js",
    "Build/b7f83ab8200ee1cf956413d4336e9d4b.framework.js",
    "Build/326308fdbada15d727ac20bee090d4aa.data",
    "Build/62ccea6a3ce3cd1d2e15d287ff9fe8ff.wasm",
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
