import SSH, { Helpers } from './ssh.js'

export function cpuUsage(client: SSH): Promise<Helpers['cpuUsage']>

export function memUsage(client: SSH): Promise<Helpers['memUsage']>
