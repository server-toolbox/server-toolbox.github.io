import { html, Component } from '../components/3rd-party/preact.js'
import { connect } from '../components/globalState.js'
import ContextButton from '../components/material/contextual-button.js'

let currentHeader;

class Header extends Component{
    state = {}
    componentDidMount(){
        currentHeader = this;
    }
    componentWillUnmount(){
        currentHeader = null;
    }
    render(){
        const { text, menuClick, devmode, translate } = this.props;
        const { text: replaceText } = this.state;
        return html`
            <button class=menu onclick=${menuClick}><i class=material-icons>menu</i></button>
            <div id=header-content>
                <div>${replaceText === undefined ? text : replaceText }</div>
                <${ContextButton} class=${'devmode' + (devmode ? ' active' : '')} icon=build align=right>
                    <li onclick=${async () => {
                        const sw = await navigator.serviceWorker.getRegistration();
                        await sw.unregister();
                        location.href = location.href;
                    }}>${translate('devmode.clearSW')}</li>
                    <li onclick=${() => {
                        localStorage.clear();
                        location.href = location.href
                    }}>${translate('devmode.clearLS')}</li>
                <//>
            </div>
        `
    }
}

export class HeaderText{
    render(){
        currentHeader && currentHeader.setState({ text: this.props.children })
    }
    componentWillUnmount(){
        currentHeader && currentHeader.setState({ text: undefined })
    }
}

export default connect(state => ({
    devmode: state.get('devmode'),
    translate: state.get('translate'),
}))(Header)
