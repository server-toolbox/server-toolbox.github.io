import { icons } from '../../path.js'
import parseLinux from './_sysInfo_linux.js'
import parseAndroid from './_sysInfo_android.js'

function parse(data){
    const lines = data.split('\n');
    const type = lines.shift();
    switch(type){
        case '0':
            return parseLinux(lines);
        case '1':
            return parseAndroid(lines);
    }
}

export default data => {
    const r = parse(data);
    r.os.icon = `${icons}/os/${r.os.type}/${r.os.id}.svg`;
    return r
}
