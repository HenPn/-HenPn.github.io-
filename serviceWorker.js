// const staticDevCoffee = "dev-coffee-site-v1";
// const assets = [
//   "/",
//   "/index.html",
//   "/css/style.css",
//   "/js/app.js",
// ];

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(staticDevCoffee).then(cache => {
//       cache.addAll(assets);
      
//     })
//   );
// });



// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });

// function createDB() {
//   idb.open('products', 1, function(upgradeDB) {
//     var store = upgradeDB.createObjectStore('beverages', {
//       keyPath: 'id'
//     });
//     store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
//     store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
//     store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
//   });
// }

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     createDB()
//   );
// });

// function readDB() {
//   idb.open('products', 1).then(function(db) {
//     var tx = db.transaction(['beverages'], 'readonly');
//     var store = tx.objectStore('beverages');
//     return store.getAll();
//   }).then(function(items) {
//     // Use beverage data
//   });
// }

function cacheAssets() {
  return caches.open('cache-v1')
  .then(function(cache) {
    return cache.addAll([
      "/index.html",
      "/css/style.css",
      "/js/app.js",
    ]);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    cacheAssets()
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Check cache but fall back to network
      return response || fetch(event.request);
    })
  );
});


