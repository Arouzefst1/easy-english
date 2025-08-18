const CACHE_NAME = 'easy-english-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

// On install: cache core shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(CORE_ASSETS))
  );
});

// On activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategy:
// - Translation API calls: network only (so you see latest, no quota caching).
// - Other GET requests: stale-while-revalidate (serve cache fast, update in background).
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = req.url;

  // Only handle GET
  if (req.method !== 'GET') return;

  if (url.includes('api.mymemory.translated.net')) {
    // Let network handle translation; no offline cache (prevents quota waste)
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(netRes => {
        if (netRes && netRes.ok && netRes.type === 'basic') {
          const copy = netRes.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return netRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});