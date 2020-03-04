import { html, Component } from '../../3rd-party/preact.js'

export default class extends Component{
    render(){
        const { icon, text, class: className, onclick } = this.props;
        return html`<button class=${'material ' + className} onclick=${onclick}>
            <i class=material-icons>${icon}</i>
            <span>${text}</span>
        </button>`
    }
}
