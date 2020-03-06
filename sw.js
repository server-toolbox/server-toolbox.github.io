async function setCache(){
    const [ list, cache ] = await Promise.all([fetch('/app/cache_list').then(r => r.text()), caches.open('v1')]);
    return cache.addAll(list.split('\n').filter(v => v !== '').map(v => /^https?:\/\//.test(v) ? v : ('/' + v)))
}

async function respond(request, response){
    // caches.match() always resolves but in case of success response will have value
    if (response !== undefined) return response;
    else {
        try{
            const [ response, cache ] = await Promise.all([fetch(request), caches.open('v1')]);
            const clone = response.clone();
            cache.put(request, clone);
            return response
        } catch(e){
            // need to respond with Response obj like fetch or caches.match do
        }
    }
}

self.addEventListener('install', e => e.waitUntil(setCache()));

self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(respond.bind(null, e.request))));
