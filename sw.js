const staticCacheName = 's-app-v1'

const assertUrls = [
	'index.html',
	'app.js',
	'/css/main.css'
]

self.addEventListener('install', async event => {
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assertUrls)
})

self.addEventListener( 'install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => cache.addAll(assertUrls)))
})

self.addEventListener('activate', event => {
	concole.log('[sw]: activate')
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	return cached ?? await fetch(request)
}

const url = new URL(request )