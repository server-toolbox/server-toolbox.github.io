import Thread from './threads.js'
import { components } from './path.js'

const thread = Symbol();
const connected = Symbol();

export default class{
    constructor(server){
        this[thread] = new Thread(components + '/ssh/thread.js', components + '/3rd-party/ssh2.js');
        this[connected] = this[thread].setAddr(server.formatURL()).then(() => this[thread].connect({
            host: server.host,
            username: server.user,
            privateKey: server.key,
            passphrase: server.passphrase,
        }))
    }
    async exec(command){
        await this[connected];
        return this[thread].exec(command)
    }
}
