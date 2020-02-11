import Go from './wasm_exec.js'

function up(dir, sep = '/'){
    const pieces = dir.split(sep);
    pieces.pop();
    return pieces.join(sep)
}

const __dirname = up(import.meta.url);

export default new Promise((res, rej) => {
    self.res = res;
    self.rej = rej;
}).then(r => {
    delete self.res;
    delete self.rej;
    return r
});

const go = new Go();

WebAssembly.instantiateStreaming(fetch(__dirname + '/core.wasm'), go.importObject).then((result) => {
    go.run(result.instance)
})
