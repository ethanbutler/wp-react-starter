/* eslint no-restricted-globals: 0 */

// const DEBUG = (process.env.NODE_ENV === 'production')
const DEBUG = true

const {
  assets
} = global.serviceWorkerOption

const CACHE_NAME = (new Date()).toISOString()

let assetsToCache = [
  ...assets,
  '/'
].map(path => {
  const url = new URL(path, global.location).toString()
  return url
})

console.log(assetsToCache)

// Installation script
self.addEventListener('install', event => {
  if(DEBUG) console.log('[SW] Install event')

  // Add core files to cache
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => {
        if(DEBUG) console.log('Cached assets: main', assetsToCache)
        return self.skipWaiting()
      })
      .catch(err => {
        console.log('Install error')
        console.error(err)
        throw err
      })
  )
})

// Activation script
self.addEventListener('activate', event => {
  if(DEBUG) console.log('[SW] Activate event')

  // Clean cache
  event.waitUntil(
    global.caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if(cacheName.indexOf(CACHE_NAME) === 0) return null

            return global.caches.delete(cacheName)
          })
        )
      })
      .catch(err => {
        console.log('Activate error')
        console.error(err)
        throw err
      })
  )
})

// Force waiting service worker to become active service worker ???
self.addEventListener('message', event => {
  switch(event.data.action){
    case 'skipWaiting':
      if(self.skipWaiting){
        self.skipWaitng()
        self.clients.claim()
      }
      break;
    default:
      break
  }
})

// ???
self.addEventListener('fetch', event => {
  console.log('fetch')
  const { request } = event

  if(DEBUG) console.log('[SW] Fetch')

  if(request.method !== 'GET'){
    if(DEBUG) console.log(`[SW] Ignore non GET request ${request.method}`)
    return
  }

  const requestUrl = new URL(request.url)

  // Ignore difference origin ???
  if(requestUrl.origin !== location.origin){
    if(DEBUG) console.log(`[SW] Ignore difference origin ${requestUrl.origin}`)
    return
  }

  const resource = global.caches.match(request)
    .then(res => {
      // Resource exists in cache
      if(res){
        if(DEBUG) console.log(`[SW] fetch URL ${requestUrl.href} from cache`)
        return res
      }

      // Make request to network for resource if not in cache
      return fetch(request)
        .then(responseNetwork => {
          // Response network can't be found ???
          if(!responseNetwork || !responseNetwork.ok){
            if(DEBUG) console.log(`[SW] URL [${
              requestUrl.toString()}] wrong responseNetWork: ${
              responseNetwork.status} ${responseNetwork.type}`)
            return responseNetwork
          }

          if(DEBUG) console.log(`[SW] URL ${requestUrl.href} fetch`)

          const responseCache = responseNetwork.clone()

          global.cache
            .open(CACHE_NAME)
            .then(cache => cache.put(request, responseCache))
            .then(() => {
              if(DEBUG) console.log(`[SW] Cache asset: ${requestUrl.href}`)
            })

          return responseNetwork
        })
        .catch(err => {
          console.log('Fetch error')
          //User is landing on page
          if(event.request.mode === 'navigate'){
            return global.caches.matches('./')
          }

          return null
        })
    })

  event.respondWith(resource)
})
