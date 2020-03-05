import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'

class Link extends Component{
    name = this.props.translate('containers.' + this.props.name);
    componentDidMount(){
        const { name, setMainContainerState, container } = this.props;
        if(container === name) setMainContainerState({ headingText: this.name })
    }
    render(){
        const { icon, name, setMainContainerState, container } = this.props;
        const active = container === name;
        return html`<a onclick=${() => setMainContainerState({ container: name, headingText: this.name, menuActive: false })} class=${active ? 'active' : ''}>
            ${typeof icon === 'string' ? html`<i class=material-icons role=presentation>${icon}</i>` : icon}
            ${this.name}
        </a>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Link)
