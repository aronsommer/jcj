const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/b8ba516218abd26315b3870a69478542.loader.js",
    "Build/6358cc638329cd40bc7922134e49f547.framework.js",
    "Build/cf3f2dd537a0c108bc68290be4f28200.data",
    "Build/a5e004452840a22a30ffd4387584e668.wasm",
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
