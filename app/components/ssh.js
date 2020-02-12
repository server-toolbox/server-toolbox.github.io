import Thread from './threads.js'
import { components } from './path.js'
import servers from './servers.js'

const server = servers[0];
const thread = Symbol();

export default class{
    constructor(){
        this[thread] = new Thread(components + '/ssh/thread.js', components + '/3rd-party/ssh2.js')
    }
    connect(){
        this[thread].connect({
            host: server.formatURL(),
            username: server.user,
            privateKey: server.key,
            passphrase: server.passphrase,
        })
    }
}
