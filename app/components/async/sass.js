import { asThread } from '../threads.js'
import { components } from '../path.js'

const sassDir = components + '/3rd-party/sass';

function callbackToPromise(f){
    return (...args) => new Promise((resolve, reject) => {
        f(...args, ({ status, message, text } = {}) => {
            if(!status) resolve(text);
            else reject(new Error(message))
        })
    })
}

async function module(){
    try{
        const script = sassDir + '/sass.js';
        const src = await fetch(script).then(r => r.text());
        const f = new Function('module', 'exports', '__dirname', src);
        const module = {exports: {}};
        f(module, module.exports, sassDir);
        const Sass = new module.exports;
        await callbackToPromise(Sass.options)({ style: '3' }); // compressed by default
        return asThread({
            compile: callbackToPromise(Sass.compile)
        }, script)
    } catch(e){
        return new Proxy({}, { get: (_, p) => () => _ })
    }
}

export default module()
