/* Shamelessly taken from https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605 */
var cacheName = 'schizomatrix';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/jquery.min.js',
  '/img/bg.png',
  '/img/logo-small.svg',
  '/img/logo.svg',
  '/img/schizoindicator-example.png',
  '/img/xlsx-icon.png',
  '/fonts/hinted-CenturyGothic-Bold.eot',
  '/fonts/hinted-CenturyGothic-Bold.ttf',
  '/fonts/hinted-CenturyGothic-Bold.woff',
  '/fonts/hinted-CenturyGothic-Bold.woff2',
  '/fonts/hinted-CenturyGothic-BoldItalic.eot',
  '/fonts/hinted-CenturyGothic-BoldItalic.ttf',
  '/fonts/hinted-CenturyGothic-BoldItalic.woff',
  '/fonts/hinted-CenturyGothic-BoldItalic.woff2',
  '/fonts/hinted-CenturyGothic-Italic.eot',
  '/fonts/hinted-CenturyGothic-Italic.ttf',
  '/fonts/hinted-CenturyGothic-Italic.woff',
  '/fonts/hinted-CenturyGothic-Italic.woff2',
  '/fonts/hinted-CenturyGothic.eot',
  '/fonts/hinted-CenturyGothic.ttf',
  '/fonts/hinted-CenturyGothic.woff',
  '/fonts/hinted-CenturyGothic.woff2',
  '/fonts/stylesheet.css',
  '/fav.ico'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});