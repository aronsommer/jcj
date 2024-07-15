const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/660f9cfb7066099c64e0de10677fc16d.loader.js",
    "Build/54efe36dfe6649e18a7e5d221a88f15b.framework.js",
    "Build/8e5a97bde935e8c3abf42476f298156a.data",
    "Build/f9e41fa01d9f45e7e17278fca62c4b13.wasm",
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
