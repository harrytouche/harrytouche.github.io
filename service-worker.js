var cacheName = "service-worker-cache-v12"
var filesToCache = [
  "/resources/manifest.json",
  "/resources/body.html",
  "/resources/head.html",
  "/resources/include.js",
  "/resources/icon.png",

  "/resources/pics/homepage/adobe-analytics.jpg",
  "/resources/pics/homepage/adobe-audience-manager.jpg",
  "/resources/pics/homepage/adobe-launch.png",
  "/resources/pics/homepage/adobe-target.png",
  "/resources/pics/homepage/alteryx.jpg",
  "/resources/pics/homepage/css.jpg",
  "/resources/pics/homepage/flask.jpg",
  "/resources/pics/homepage/google-analytics.jpg",
  "/resources/pics/homepage/google-optimize.jpg",
  "/resources/pics/homepage/google-tag-manager.png",
  "/resources/pics/homepage/heroku.jpg",
  "/resources/pics/homepage/html.png",
  "/resources/pics/homepage/javascript.png",
  "/resources/pics/homepage/python.png",
  "/resources/pics/homepage/tableau.jpg",
  
  "/resources/pics/about/arctic.gif",
  "/resources/pics/about/beyond-work.gif",
  "/resources/pics/about/dragon.jpg",
  "/resources/pics/about/eton.jpg",
  "/resources/pics/about/football.gif",
  "/resources/pics/about/george.jpg",
  "/resources/pics/about/home-life.gif",
  "/resources/pics/about/origin.jpg",
  "/resources/pics/about/oxford.gif",

  "/",
  
  "/about/",
  
  "/maths-box/calculations.js",
  "/maths-box/",
  
  "/test-site/",
  "/test-site/order-confirmation.html",
  "/test-site/productA.jpg",
  "/test-site/productB.jpg",
  "/test-site/productC.jpg",
  "/test-site/scripts.js",
  "/test-site/scripts_home.js",
  "/test-site/scripts_oc.js",
  "/test-site/styles.css"
]

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
