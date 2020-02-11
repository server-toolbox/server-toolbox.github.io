import Thread from './threads.js'
import { components } from './path.js'

const coreDir = components + '/async/core/'

export const {
    connect
} = new Thread(coreDir + 'index.js', coreDir + 'core.wasm')
