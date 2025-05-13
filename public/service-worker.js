// 비활성화된 Service Worker (개발 모드용)
// 이 파일은 캐시 사용을 완전히 비활성화합니다

// 기존 캐시 삭제
self.addEventListener('install', event => {
  console.log('Service Worker installed with caching disabled');
  
  // 기존 캐시 삭제
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName).then(() => {
            console.log('Cache', cacheName, 'deleted');
          });
        })
      );
    })
  );
  
  // 즉시 활성화
  self.skipWaiting();
});

// 네트워크 요청을 항상 네트워크에서만 가져오도록 설정
self.addEventListener('fetch', event => {
  // 항상 네트워크에서 가져오기 (캐시 사용 안 함)
  event.respondWith(
    fetch(event.request).catch(error => {
      console.error('Fetch failed:', error);
      return new Response('Network request failed', {
        status: 408,
        headers: new Headers({
          'Content-Type': 'text/plain'
        }),
      });
    })
  );
});

// 활성화시 모든 캐시 삭제
self.addEventListener('activate', event => {
  console.log('Service Worker activated with caching disabled');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('All caches have been deleted');
      return self.clients.claim();
    })
  );
}); 