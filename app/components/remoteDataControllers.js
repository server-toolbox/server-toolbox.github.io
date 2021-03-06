import { icons } from './path.js'
import { humanifySize } from './helpers.js'

export function cpuUsage(client){
    return client.exec('cat /proc/stat; echo ---SPLITTER---; sleep 1s; cat /proc/stat', {}, 'cpuUsage')
}

export function memUsage(client){
    return client.exec('free', {}, 'memUsage')
}

function mergeObjects(...objs){
    const base = objs.shift();
    for(const obj of objs){
        for(const i in obj){
            if(i in base && typeof base[i] === 'object') mergeObjects(base[i], obj[i]);
            else base[i] = obj[i]
        }
    }
    return base
}

function _sysInfo_memory(client){
    return memUsage(client).then(v => ({
        hardware: {
            ram: humanifySize(v.total * 1024)
        }
    }))
}

function _sysInfo_kernel(client){
    return Promise.all([
        client.exec('uname -s'),
        client.exec('uname -r'),
    ]).then(([ name, version ]) => ({
        os: {
            kernel: { name, version }
        }
    }))
}

async function _sysInfo(client){
    const env = await client.exec('env');
    let ANDROID_ROOT, ANDROID_DATA;
    for(const [ key ] of env.split('\n').map(v => v.split('='))){
        if(key === 'ANDROID_ROOT') ANDROID_ROOT = true;
        else if(key === 'ANDROID_DATA') ANDROID_DATA = true;
    }
    if(ANDROID_ROOT && ANDROID_DATA) return mergeObjects(
        {
            os: {
                type: 'linux',
                id: 'android',
                name: 'Android',
                links: {
                    home: 'https://www.android.com',
                    support: 'https://support.google.com/android',
                }
            }
        },
        ...await Promise.all([
            client.exec('cat /system/build.prop', {}, 'build.prop'),
            client.exec('cat /proc/cpuinfo', {}, 'cpuinfo'),
            _sysInfo_memory(client),
            _sysInfo_kernel(client),
        ]),
    );
    return mergeObjects(
        {
            os: {
                type: 'linux',
            },
        },
        ...await Promise.all([
            client.exec('cat /etc/*-release', {}, 'etc_*-release'),
            client.exec('cat /proc/cpuinfo', {}, 'cpuinfo'),
            _sysInfo_memory(client),
            _sysInfo_kernel(client),
        ]),
    )
}

export async function sysInfo(client){
    const r = await _sysInfo(client);
    r.os.icon = `${icons}/os/${r.os.type}/${r.os.id}.svg`;
    return r
}

export function containersList(client){
    return client.exec("docker inspect --format='{{json .}}' `docker container ls -a --format='{{.ID}}' --no-trunc`", {}, 'docker_container_ls')
}
