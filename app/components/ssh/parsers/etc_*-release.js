const id_mappings = {
    'manjaro-arm': 'manjaro',
}

function parseLines(lines){
    const parsed = {};
    for(const line of lines.split('\n')){
        const r = /^([A-Z_]+)=("(.*)"|.*)$/.exec(line);
        if(r) parsed[r[1]] = r[3] || r[2]
    }
    return parsed
}

export default data => {
    const {
        ID,
        NAME,
        PRETTY_NAME,
        DISTRIB_RELEASE,
        HOME_URL,
        SUPPORT_URL,
    } = parseLines(data);

    return {
        os: {
            id: ID in id_mappings ? id_mappings[ID] : ID,
            name: PRETTY_NAME || NAME,
            version: DISTRIB_RELEASE,
            links: {
                home: HOME_URL,
                support: SUPPORT_URL,
            }
        },
    }
}
