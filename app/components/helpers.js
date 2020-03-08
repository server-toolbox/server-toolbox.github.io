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
