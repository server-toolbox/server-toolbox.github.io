import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'

class Link extends Component{
    render(){
        const { translate, icon, name, setMainContainerState, container } = this.props;
        const active = container === name;
        return html`<a onclick=${() => setMainContainerState({ container: name })} class=${active ? 'active' : ''}>
            ${typeof icon === 'string' ? html`<i class=material-icons role=presentation>${icon}</i>` : icon}
            ${translate('containers.' + name)}
        </a>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Link)
