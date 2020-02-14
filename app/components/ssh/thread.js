import '../3rd-party/ssh2.js'
import rand from '../rand.js'
import AsyncFunction from '../asyncFunction.js'
import selfResolvingPromise from '../selfResolvingPromise.js'

const conn = new ssh2;
const connected = selfResolvingPromise();
const streams = Object.create(null);
const streamData = Object.create(null);
const parsers = Object.create(null);

const exports = {
    setAddr(addr){
        self.wsAddr = addr
    },

    async connect(opts){
        conn.on('ready', connected.resolve).on('error', connected.reject).connect(opts);
        setInterval(() => exports.exec('echo 1'), opts.keepAliveTimeout || 30000);
        await connected
    },

    async exec(command, env = {}, resultParser){
        await connected;
        return new Promise((resolve, reject) => {
            conn.exec(command, { env }, (err, stream) => {
                if(err) reject(err);
                let res = '';
                stream.on('data', data => res += data);
                stream.on('error', reject);
                stream.on('close', () => resolve(res));
            })
        })
    },

    async shell(){
        await connected;
        return new Promise((resolve, reject) => {
            conn.shell((err, stream) => {
                if(err) reject(err);
                const shellId = rand();
                streams[shellId] = stream;
                const dataStack = [selfResolvingPromise()];
                streamData[shellId] = dataStack;
                const dataId = `|${shellId}|\n`;
                let nextPromise = dataStack[0];
                stream.on('data', data => {
                    data += '';
                    if(data.startsWith(dataId)){
                        const old = nextPromise;
                        nextPromise = selfResolvingPromise();
                        dataStack.push(nextPromise);
                        old.resolve({data: data.slice(dataId.length)})
                    }
                });
                stream.on('error', reject);
                stream.on('close', () => nextPromise.resolve('close'));
                resolve(shellId)
            })
        })
    },

    _shell_exec(shellId, command){
        streams[shellId].write(command + '\n')
    },

    async _shell_populateNextData(shellId, resultParser){
        const currentPortion = streamData[shellId].shift();
        if(resultParser){
            if(!parsers[resultParser]) parsers[resultParser] = new AsyncFunction('data', resultParser);
            return parsers[resultParser](await currentPortion)
        }
        return currentPortion
    }
};

export default exports
