import Thread from './threads.js'
import { components } from './path.js'

const thread = Symbol();
const shellId = Symbol

export default class{
    constructor(server){
        this[thread] = new Thread(components + '/ssh/thread.js', components + '/3rd-party/ssh2.js');
        this[thread].setAddr(server.formatURL()).then(() => this[thread].connect({
            host: server.host,
            username: server.user,
            privateKey: server.key,
            passphrase: server.passphrase,
        }))
    }
    exec(command){
        return this[thread].exec(command)
    }
}

const execHelpers = {
    single(command, shellId){
        return `stdout=$(echo \\|${shellId}\\|; ${command}); echo "$stdout"`
    },
    periodical(command, shellId, timeout){
        return `while :; do ${execHelpers.single(command, shellId)}; sleep ${timeout / 1000}s; done`
    },
}

export class Shell{
    constructor(_thread, resultParser){
        const realThread = _thread[thread];
        this[thread] = realThread;
        this[shellId] = realThread.shell();
        this[shellId].catch(e => this.onError(e));
        (async() => {
            let alive = true;
            const id = await this[shellId];
            while(alive){
                const result = await realThread._shell_populateNextData(id, resultParser);
                console.log('_shell_populateNextData:', {result})
                if(result === 'close'){
                    alive = false;
                    this.onClose()
                } else {
                    this.onData(result.data)
                }
            }
        })()
    }
    async rawExec(command){
        this[thread]._shell_exec(await this[shellId], command)
    }
    async exec(command, helper, ...helperArgs){
        const _helper = execHelpers[helper];
        if(_helper) return this.rawExec(await _helper(command, await this[shellId], ...helperArgs));
        throw new Error(`there is no helper ${helper}`)
    }
    onData(){}
    onClose(){}
    onError(){}
}
