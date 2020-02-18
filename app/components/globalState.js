import { html, Component } from './3rd-party/preact.js'
import withLog from './logger/index.js'

const connectedElements = new Map();

function updateConnectedElements(){
    for(const [ element ] of connectedElements) element.forceUpdate()
}

function log(state, ...args){
    console.group('GLOBAL_STATE');
    console.log(...args);
    console.log('STATE: %O', new Map(state));
    console.groupEnd()
}

class State extends Map{
    set(key, value){
        log(this, 'Set key: %O value %O', key, value);
        updateConnectedElements();
        super.set(key, value)
    }
    delete(key){
        log(this, 'Deleted key: %O', key);
        updateConnectedElements();
        super.delete(key)
    }
    clear(){
        log(this, 'Cleared');
        updateConnectedElements();
        super.clear()
    }
}

const GLOBAL_STATE = new State();

let modulesRegister = Object.create(null);
let asyncComponentsLoaded = false;

export function connect(stateDescriptor){
    return _ => class extends Component{
        componentDidMount(){
            connectedElements.set(this, undefined)
        }
        componentWillUnmount(){
            connectedElements.delete(this, undefined)
        }
        render(){
            return html`<${_} ...${this.props} ...${stateDescriptor(GLOBAL_STATE)}/>`
        }
    }
}

export const waitForAsyncComponents = withLog(() => async function waitForAsyncComponents(){
    if(asyncComponentsLoaded) throw new Error('waitForAsyncComponents can be called only once');
    asyncComponentsLoaded = true;
    const res = await Promise.all(Object.keys(modulesRegister).map(p => modulesRegister[p].then(r => ({r, p}))));
    modulesRegister = null;
    res.forEach(({r, p}) => GLOBAL_STATE.set(p, r))
})

export function registerAsyncComponent(name, component){
    if(asyncComponentsLoaded) throw new Error('waitForAsyncComponents already called. Cannot define async components any more');
    modulesRegister[name] = component
}
