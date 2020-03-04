import { html, Component } from '../../3rd-party/preact.js'

export default class extends Component{
    render(){
        const { active, values, onInput} = this.props;
        const [ key1, key2 ] = Object.keys(values);
        const {[key1]: val1, [key2]: val2} = values;
        return html`<div class='material switch'>
            <div onclick=${() => onInput && onInput(key1)} class=${active === undefined || active === key1 ? 'active' : ''}>${val1}</div>
            <div onclick=${() => onInput && onInput(key2)} class=${active === key2 ? 'active' : ''}>${val2}</div>
        </div>`
    }
}
