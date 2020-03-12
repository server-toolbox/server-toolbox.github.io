import servers from './servers.js'

type Server = typeof servers[0]

export type Helpers = {
    cpuUsage: {
        [name: string]: number
    }
    memUsage: {
        [name in 'total' | 'used' | 'free' | 'shared' | 'buff_cache' | 'available' | 'totalSwap' | 'usedSwap' | 'freeSwap']: number
    }
    sysInfo: {
        //
    }
}

export default class SSH{
    constructor(server: Server)
    exec<T extends keyof Helpers>(command: string, env: { [x: string]: string }, helper: T): Promise<Helpers[T]>
    exec(command: string, env?: { [x: string]: string }): Promise<string>
}
