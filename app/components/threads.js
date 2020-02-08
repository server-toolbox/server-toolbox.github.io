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
        else if(data.data) callStack[data.id].resolve(data.data);
        else callStack[data.id].reject(new Error(data.message))
    }
}

export default class Thread{
    constructor(module){
        const workerLoad = new SelfResolvingPromise;
        const worker = new Worker(workerPath, { type: 'module' });
        worker.onmessage = onmessage(workerLoad);
        worker.postMessage({module});
        const namePrefix = `thread ${threadCount++}\n${module}: `
        return new Proxy(this, {
            get(_, p){
                if(!(p in _)){
                    _[p] = withLog(console => withName(namePrefix + p, async (...args) => {
                        try{
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
                            console.log('return:', res);
                            return res
                        } catch(e){
                            console.error(e)
                        }
                    }));
                    return _[p]
                }
            }
        })
    }
}
