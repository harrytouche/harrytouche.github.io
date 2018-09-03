var cacheName = "service-worker-cache-v01"
var filesToCache = [
  "/resources/icon.png"
]

//console.log("filesToCache", filesToCache)

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  var now = Date.now();
  e.waitUntil(  
  caches.open(cacheName).then(function(cache) {
      var cachePromises = filesToCache.map(function(fileToCache) {
        var url = new URL(fileToCache, location.href);
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;

        return fetch(new Request(url, {mode: 'no-cors'})).then(function(response) {
          if (response.status >= 400) {
            throw new Error('request for ' + fileToCache + ' failed with status ' + response.statusText);
          }

          // Use the original URL without the cache-busting parameter as the key for cache.put().
          return cache.put(fileToCache, response);
        }).catch(function(error) {
          console.error('Not caching ' + fileToCache + ' due to ' + error);
        });
      });

      return Promise.all(cachePromises).then(function() {
        console.log('Pre-fetching complete.');
      });
    }).catch(function(error) {
      console.error('Pre-fetching failed:', error);
    })
  )
})




self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Checking cache', key)
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(function(response) {
        console.log("[ServiceWorker] "+((response)?"Found in cache":"Not found in cache"), e.request.url)
        return response || fetch(e.request);
    })
  );
});