import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'

class Link extends Component{
    render(){
        const { translate, icon, name, setMainContainerState } = this.props;
        return html`<a onclick=${() => setMainContainerState({ container: name })}>
            <i class=material-icons role=presentation>${icon}</i>
            ${translate('containers.' + name)}
        </a>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Link)
