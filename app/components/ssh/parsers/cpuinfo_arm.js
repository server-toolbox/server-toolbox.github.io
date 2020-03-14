import { processors, implementers } from './cpuinfo_arm_tables.js'

export default processor => {
    let modelName, implementer, part;
    const res = JSON.parse(JSON.stringify(processor));
    for(const i in processor){
        switch(i.toLowerCase()){
            case 'model name':
                modelName = processor[i];
                break;
            case 'cpu implementer':
                implementer = parseInt(processor[i]);
                break;
            case 'cpu part':
                part = parseInt(processor[i]);
                break;
        }
    }
    if(!modelName && implementer && part && implementers[implementer] && processors[implementer][part]){
        res['model name'] = `${implementers[implementer]} ${processors[implementer][part]}`;
    }
    return res
}
