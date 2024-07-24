const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/5ea1188eb0b50a9350497ac0bca78862.loader.js",
    "Build/b7f83ab8200ee1cf956413d4336e9d4b.framework.js",
    "Build/b1d77af74a1f939cfcd01c0e9d7217ae.data",
    "Build/bf173f1d9869edb501af0e6a09063bb4.wasm",
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
