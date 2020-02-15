import servers from './servers.js'

type Server = typeof servers[0]

type Helpers = {
    cpuUsage: {
        [name: string]: number
    }
}

export default class SSH{
    constructor(server: Server)
    exec<T extends keyof Helpers>(command: string, env: { [x: string]: string }, helper: T): Promise<Helpers[T]>
    exec(command: string, env?: { [x: string]: string }): Promise<string>
}
