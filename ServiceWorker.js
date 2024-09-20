const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/10f8617eb39917f599b969d6e05daf3f.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/253c1e22f8c03c883f4967e990f912cd.data",
    "Build/5b94d1b657b53290f03115372e0574d7.wasm",
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
