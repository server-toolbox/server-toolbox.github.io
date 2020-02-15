import '../3rd-party/ssh2.js'
import selfResolvingPromise from '../selfResolvingPromise.js'
import { up } from '../path.js'

const parsersDir = up(import.meta.url) + '/parsers/';
const conn = new ssh2;
const connected = selfResolvingPromise();
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
        let parser;
        if(resultParser) parser = import(parsersDir + resultParser + '.js');
        const data = await new Promise((resolve, reject) => {
            conn.exec(command, { env }, (err, stream) => {
                if(err) reject(err);
                let res = '';
                stream.on('data', data => res += data);
                stream.on('error', reject);
                stream.on('close', () => resolve(res));
            })
        });
        if(resultParser){
            if(!parsers[resultParser]) parsers[resultParser] = (await parser).default;
            return await parsers[resultParser](data)
        } else return data
    },
};

export default exports
