import { components } from '../path.js'

async function jsYaml(){
    try{
        const module = await fetch(`${components}/3rd-party/js-yaml.min.js`).then(r => r.text());
        const f = new Function('window', module);
        const exports = {};
        f(exports);
        return exports.jsyaml
    } catch(e){
        return new Proxy({}, { get: (_, p) => () => _ })
    }
}

export default jsYaml()
