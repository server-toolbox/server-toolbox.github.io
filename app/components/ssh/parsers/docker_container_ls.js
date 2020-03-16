function _appendToGroup(container){
    const project = container.Config.Labels['com.docker.compose.project'];
    for(const projectName in this){
        if(project === projectName){
            this[project].push(container);
            return
        }
    }
    this[project] = [ container ]
}

function groupByService(containers){
    const ungrouped = [];
    const grouped = {};
    const res = { grouped, ungrouped };
    const appendToGroup = _appendToGroup.bind(grouped);
    for(const container of containers){
        if(container.Config.Labels['com.docker.compose.project']) appendToGroup(container);
        else ungrouped.push(container)
    }
    return res
}

export default data => {
    return groupByService(
        data
        .split('\n')
        .filter(v => !/^\s*$/.test(v))
        .map(v => JSON.parse(v))
    )
}
