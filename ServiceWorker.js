const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/bde51953f2adca7ce39e349e9bed639b.loader.js",
    "Build/77372dad85774c963347dcc519fe21d1.framework.js",
    "Build/51467d21ee027ef592c809319399e803.data",
    "Build/c2aeb65b65cf1ff40d021006ca4b98a9.wasm",
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
