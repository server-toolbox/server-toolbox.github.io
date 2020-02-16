const coreFilter = /^cpu\d*\s+/;
const splitter = '---SPLITTER---';

function mapper(data){
    const stats = data
        .split('\n')
        .filter(a => coreFilter.test(a))
        .map(str => str.split(/\s+/));
    const res = {};
    for(const stat of stats) res[stat.shift()] = stat.map(v => +v);
    return res
}

export default data => {
    const [ first, second ] = data.split(splitter).map(mapper);
    const res = {};
    for(const name in first){
        const [
            prevuser,
            prevnice,
            prevsystem,
            previdle,
            previowait,
            previrq,
            prevsoftirq,
            prevsteal,
            prevguest,
            prevguest_nice,
        ] = first[name];

        const [
            user,
            nice,
            system,
            idle,
            iowait,
            irq,
            softirq,
            steal,
            guest,
            guest_nice,
        ] = second[name];

        const PrevIdle = previdle + previowait;
        const Idle = idle + iowait;

        const PrevNonIdle = prevuser + prevnice + prevsystem + previrq + prevsoftirq + prevsteal;
        const NonIdle = user + nice + system + irq + softirq + steal;

        const PrevTotal = PrevIdle + PrevNonIdle;
        const Total = Idle + NonIdle;

        const totald = Total - PrevTotal;
        const idled = Idle - PrevIdle;

        res[name] = Math.round((totald - idled) / totald * 10000) / 100
    }
    return res
}
