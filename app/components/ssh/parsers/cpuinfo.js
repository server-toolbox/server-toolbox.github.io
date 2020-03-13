const reg = /^\s*(.*?)\s*:\s*(.*?)\s*$/;

export default lines => {
    const processors = [];
    const data = {};
    let toFill = [];
    for(const line of lines.split('\n')){
        const res = reg.exec(line);
        if(res){
            const [, name, val] = res;
            if(name === 'processor'){
                const processor = {};
                toFill.push(processor);
                processors[val] = processor;
            } else {
                if(toFill.length) for(const processor of toFill) processor[name] = val;
                else data[name] = val
            }
        } else toFill = []
    }
    data.processors = processors;
    return {
        hardware: {
            cpu: {
                info: data
            }
        }
    }
}
