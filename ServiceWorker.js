const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/37f4cb4d3ccae4b3b79676f5d86c0e58.loader.js",
    "Build/54efe36dfe6649e18a7e5d221a88f15b.framework.js",
    "Build/6d7146966939c33bb55aa06b1b8fa212.data",
    "Build/2c581f1de249599b1543638e94e78ee8.wasm",
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
