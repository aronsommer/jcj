const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/498030d90f9cec14e538a5a38c801cc4.loader.js",
    "Build/0db7ba5a1f13be59b8e31ef9c706b3f6.framework.js",
    "Build/ec1f9d2d9daf9fe1288113b36dad5ce9.data",
    "Build/4906acfb26daa9b4e99b02fb0d004cf7.wasm",
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
