export function cpuUsage(client){
    return client.exec('cat /proc/stat; echo ---SPLITTER---; sleep 1s; cat /proc/stat', {}, 'cpuUsage')
}

export function memUsage(client){
    return client.exec('free', {}, 'memUsage')
}

export function sysInfo(client){
    return client.exec('ENV0=`env | grep ANDROID_`; ( echo "$ENV0" | grep ANDROID_ROOT && echo "$ENV0" | grep ANDROID_DATA ) > /dev/null && ( echo 1 && cat /system/build.prop ) || ( echo 0 && cat /etc/*-release )', {}, 'sysInfo')
}
