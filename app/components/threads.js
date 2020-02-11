import { components } from './path.js'
import rand from './rand.js'
import withLog, { withName } from './logger/index.js'

const workerPath = components + '/threads/worker.js';
const callStack = Object.create(null);

let threadCount = 1;

class SelfResolvingPromise{
    constructor(){
        let r, j;
        const promise = new Promise((_, $) => { r = _; j = $ });
        promise.resolve = r;
        promise.reject = j;
        return promise
    }
}

function onmessage(workerLoad){
    return function({ data }){
        if(data === 'load') workerLoad.resolve();
        else if('data' in data) callStack[data.id].resolve(data.data);
        else callStack[data.id].reject(new Error(data.message))
    }
}

function getNamePrefix(module){
    return `thread ${threadCount++}\n${module}: `
}

export default class Thread{
    constructor(module){
        const workerLoad = new SelfResolvingPromise;
        const worker = new Worker(workerPath, { type: 'module' });
        worker.onmessage = onmessage(workerLoad);
        worker.postMessage({module});
        const namePrefix = getNamePrefix(module);
        return new Proxy(this, {
            get(_, p){
                if(!(p in _)) _[p] = withLog(() => withName(namePrefix + p, async (...args) => {
                    await workerLoad;
                    const id = rand();
                    callStack[id] = new SelfResolvingPromise;
                    worker.postMessage({
                        method: p,
                        args,
                        id,
                    });
                    const res = await callStack[id];
                    delete callStack[id];
                    return res
                }));
                return _[p]
            }
        })
    }
}

export function asThread(existentThread, module){
    const namePrefix = getNamePrefix(module);
    for(const p in existentThread){
        if(typeof existentThread[p] === 'function'){
            const realF = existentThread[p];
            existentThread[p] = withLog(() => withName(namePrefix + p, realF))
        }
    }
    return existentThread
}
