const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/4cc98b286e41c2979da46866ca47398f.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/428c8bbc5a126f60aeac06499b05f4da.data",
    "Build/3e604341dcccce52f49a1c2d153cffc2.wasm",
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
