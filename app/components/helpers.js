export function setIntervalImmediate(handler, timeout, ...args){
    handler();
    return setInterval(handler, timeout, ...args)
}
