const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/ca2be52e57aa3ac1897afa24fbdc08ef.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/e0362199f6c9cfcc16fffa03f414bc32.data",
    "Build/27324ff63deebcea4434f4e687cb8e91.wasm",
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
