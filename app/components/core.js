import Thread from './threads.js'
import { components } from './path.js'

const coreDir = components + '/async/core/';
const thread = Symbol();

function createThread(){
    return new Thread(coreDir + 'index.js', coreDir + 'core.wasm')
}

export default class{
    constructor(){
        this[thread] = createThread();
    }
    connect(host, path, port, ssl = true){
        if(typeof host !== 'string') throw new TypeError('host parameter must be of type string');
        const url = new URL(`ws${ssl ? 's' : ''}://l`);
        url.host = host;
        url.pathname = path || '';
        url.port = port;
        return this[thread].connect(url.href)
    }
}
