var dataCacheName = 'LASUDevPwaDc.v4'
var cacheName = 'LASUDevPwaC.v4'
var filesToCache = [
    '/',
    'js/app.js',
    'js/jquery-slim.min.js',
    'js/typed.min.js',
    'js/popper.min.js',
    'js/bootstrap.min.js',
    'css/bootstrap.min.css',
    'css/style.css',
    'images/01.jpg',
    'images/03.jpg',
    'images/team/01.jpg',
    'images/team/02.jpg',
    'images/team/03.jpg',
    'images/team/04.jpg',
]
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install')
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell')
            return cache.addAll(filesToCache)
        })
    )
})
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate')
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
    return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.method , " ",e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request)
        })
    )
})