const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/3cec536ba214896da86ac6c30c52f842.loader.js",
    "Build/2ce07ef34ac12085f6262fad3a26d0de.framework.js",
    "Build/30b27b825037306605cec8df77d83b62.data",
    "Build/5a26891b50eb4a7e0e29f759b91733de.wasm",
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
