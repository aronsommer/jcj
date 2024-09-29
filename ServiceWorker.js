const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/a95e30615bbd1c1025da841779ecaf4e.loader.js",
    "Build/45105231ed06367283a5395e6e9a4cef.framework.js",
    "Build/12e6b0e4ac707f146e808eb0548622f6.data",
    "Build/0cc43c7c21932e3bab4ff67c485277da.wasm",
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
