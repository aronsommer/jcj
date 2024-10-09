const cacheName = "Aron Sommer-Jet Car Jump-1.0";
const contentToCache = [
    "Build/8f76f3567d9beac054cac8fd2547f009.loader.js",
    "Build/77372dad85774c963347dcc519fe21d1.framework.js",
    "Build/b4782df95c71881fc94cdea694421b0a.data",
    "Build/5d0833b0c581ab7731139fe95aa3ab05.wasm",
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
