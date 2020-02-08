import { html, Component } from './3rd-party/preact.js'

const GLOBAL_STATE = new Map();

let modulesRegister = Object.create(null);
let asyncComponentsLoaded = false;

export function connect(stateDescriptor){
    return _ => class extends Component{
        render(){
            return html`<${_} ...${this.props} ...${stateDescriptor(GLOBAL_STATE)}/>`
        }
    }
}

export async function waitForAsyncComponents(){
    if(asyncComponentsLoaded) throw new Error('waitForAsyncComponents can be called only once');
    asyncComponentsLoaded = true;
    const res = await Promise.all(Object.keys(modulesRegister).map(p => modulesRegister[p].then(r => ({r, p}))));
    modulesRegister = null;
    res.forEach(({r, p}) => GLOBAL_STATE.set(p, r))
}

export function registerAsyncComponent(name, component){
    if(asyncComponentsLoaded) throw new Error('waitForAsyncComponents already called. Cannot define async components any more');
    modulesRegister[name] = component
}
