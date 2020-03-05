import { GLOBAL_STATE } from './globalState.js'
import SSH from './ssh.js'

const _prefix = Symbol();

class Server{
    constructor(prefix){
        this[_prefix] = prefix
    }

    get name(){
        return localStorage[this[_prefix] + 'name']
    }
    set name(v){
        localStorage[this[_prefix] + 'name'] = v
    }

    get host(){
        return localStorage[this[_prefix] + 'host']
    }
    set host(v){
        localStorage[this[_prefix] + 'host'] = v
    }

    get port(){
        return +localStorage[this[_prefix] + 'port']
    }
    set port(v){
        localStorage[this[_prefix] + 'port'] = v
    }

    get path(){
        return localStorage[this[_prefix] + 'path']
    }
    set path(v){
        localStorage[this[_prefix] + 'path'] = v
    }

    get authMethod(){
        return localStorage[this[_prefix] + 'authMethod']
    }
    set authMethod(v){
        localStorage[this[_prefix] + 'authMethod'] = v
    }

    get user(){
        return localStorage[this[_prefix] + 'user']
    }
    set user(v){
        localStorage[this[_prefix] + 'user'] = v
    }

    get password(){
        return localStorage[this[_prefix] + 'password']
    }
    set password(v){
        localStorage[this[_prefix] + 'password'] = v
    }

    get key(){
        return localStorage[this[_prefix] + 'key']
    }
    set key(v){
        localStorage[this[_prefix] + 'key'] = v
    }

    get passphrase(){
        return localStorage[this[_prefix] + 'passphrase']
    }
    set passphrase(v){
        localStorage[this[_prefix] + 'passphrase'] = v
    }

    get ssl(){
        return Boolean(+localStorage[this[_prefix] + 'ssl'])
    }
    set ssl(v){
        localStorage[this[_prefix] + 'ssl'] = +v
    }

    formatURL(){
        const url = new URL(`${'ws' + (this.ssl ? 's' : '')}://l`);
        url.host = this.host;
        url.port = this.port;
        url.pathname = this.path;
        return url.href
    }
}

const filter = /^server\d+host$/;

const servers = new Array(Object.keys(localStorage).filter(filter.test.bind(filter)).length).fill(0).map((_, i) => new Server('server' + i));

servers.forEach(addConnection);

GLOBAL_STATE.set('servers', servers);

export function createNew(){
    const index = servers.length;
    const server = new Server('server' + index);
    server.host = '';
    servers.push(server);
    addConnection(server, index);
    GLOBAL_STATE.set('servers', servers)
}

function addConnection(server, index){
    const connection = new SSH(server);
    GLOBAL_STATE.setSilent('connection' + index, connection)
}
