// check if service worker is supported and register it
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(function () {
            return navigator.serviceWorker.ready;
        })
        .then(function (serviceWorkerRegistration) {
            reg = serviceWorkerRegistration;
            console.log('Service Worker Registered');
        })
        .catch(function (error) {
            console.log('Error during SW registration', error);
        });
}