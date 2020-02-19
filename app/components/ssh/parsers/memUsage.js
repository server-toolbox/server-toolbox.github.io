function getNums(str){
    return str.split(/\s+/).map(v => +v)
}

export default data => {
    const [, mem, swap] = data.split('\n');
    const [, total, used, free, shared, buff_cache, available] = getNums(mem);
    const [, totalSwap, usedSwap, freeSwap] = getNums(swap);
    return { total, used, free, shared, buff_cache, available, totalSwap, usedSwap, freeSwap }
}
