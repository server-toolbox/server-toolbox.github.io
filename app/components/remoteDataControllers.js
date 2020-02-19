export function cpuUsage(client){
    return client.exec('cat /proc/stat; echo ---SPLITTER---; sleep 1s; cat /proc/stat', {}, 'cpuUsage')
}

export function memUsage(client){
    return client.exec('free', {}, 'memUsage')
}
