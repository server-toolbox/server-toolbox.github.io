import '../3rd-party/ssh2.js'

const conn = new ssh2;
let resolveConnect, rejectConnect;
const connected = new Promise(($, _) => {
    resolveConnect = $;
    rejectConnect = _;
});

const exports = {
    setAddr(addr){
        self.wsAddr = addr
    },

    async connect(opts){
        conn.on('ready', resolveConnect).on('error', rejectConnect).connect(opts);
        setInterval(() => exports.exec('echo 1'), opts.keepAliveTimeout || 30000);
        await connected
    },

    async exec(command, env = {}){
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
};

export default exports
