const lines = (function (data){
    function sum(a, b){
        return +a + +b
    }

    const coreFilter = /^cpu\d+\s+/;

    const stats = data
        .split('\n')
        .filter(a => coreFilter.test(a))
        .map(str => str.split(' '));
    const res = {};
    for(const stat of stats){
        res[stat.shift()] = Math.round((1 - stat[3] / stat.reduce(sum)) * 10000) / 100
    }
    return res
}).toString().split('\n');

lines.shift();
lines.pop();

export default lines.join('\n')
