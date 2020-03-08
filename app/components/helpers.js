export function setIntervalImmediate(handler, timeout, ...args){
    handler();
    return setInterval(handler, timeout, ...args)
}

function _p(num){
    return `${num < 10 ? '0' : ''}${num}`
}

export function formatTime(date){
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${_p(h)}:${_p(m)}:${_p(s)}`
}

const sizes = [ 'b', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ]

export function humanifySize(bytes, sizesStack = sizes.slice()){
    if(sizesStack.length === 1 || bytes < 1024) return bytes + sizesStack[0];
    return humanifySize(Math.round(bytes / 1024 * 100) / 100, sizesStack.slice(1))
}
