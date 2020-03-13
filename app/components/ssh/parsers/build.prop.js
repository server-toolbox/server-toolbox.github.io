const skipLines = /^(#.*|\s*)$/;

function splitLine(line){
    const r = line.split('=');
    return [
        r.shift().trimLeft().trimRight(),
        r.join('=').trimLeft().trimRight()
    ]
}

function parse(lines){
    const res = {};
    for(const [ key, data ] of lines.split('\n').filter(v => !skipLines.test(v)).map(splitLine)){
        res[key] = data
    }
    return res
}

const codenames = {
    3: 'Cupcake',
    4: 'Donut',
    5: 'Eclair',
    8: 'Froyo',
    9: 'Gingerbread',
    11: 'Honeycomb',
    14: 'Ice Cream Sandwich',
    16: 'Jelly Bean',
    19: 'KitKat',
    21: 'Lollipop',
    23: 'Marshmallow',
    24: 'Nougat',
    26: 'Oreo',
    28: 'Pie',
    29: '10',
    30: '11',
}

function getCodename(apiLevel){
    let current = '';
    for(let i = 0; i <= apiLevel; i++){
        if(codenames[i]) current = codenames[i];
    }
    return current
}

export default data => {
    const parsed = parse(data);
    return {
        os: {
            version: parsed['ro.build.version.release'],
            codename: getCodename(+parsed['ro.build.version.sdk']),
        },
        hardware: {
            brand: parsed['ro.product.brand'],
            model: parsed['ro.product.model'],
            cpu: {
                type: parsed['ro.product.cpu.abi'],
                suportedInstructions: parsed['ro.product.cpu.abilist'].split(','),
            },
            board: parsed['ro.board.platform'],
        },
    }
}
