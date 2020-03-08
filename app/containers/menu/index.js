import { html, Component } from '../../components/3rd-party/preact.js'
import Link from './link.js'
import { GLOBAL_STATE, connect } from '../../components/globalState.js'
import Switch from '../../components/material/toggle/index.js'

class Menu extends Component{
    render(){
        const { setMainContainerState, container, devmode, translate } = this.props;
        const _ = { setMainContainerState, container };
        return html`
            <header>
                <img src="https://getmdl.io/templates/dashboard/images/user.jpg"/>
                <span>hello@example.com</span>
            </header>
            <nav>
                <${Link} icon=home name=home ...${_}/>
                <${Link} icon=storage name=servers ...${_}/>
                <${Link} icon=developer_board name=containers ...${_}/>
                <${Link} icon=sd_storage name=storage ...${_}/>
                <${Link} icon=device_hub name=devices ...${_}/>
                <${Link} icon=memory name=system ...${_}/>
            </nav>
            <div>
                <a class=devmode-toggle onclick=${() => {
                    const next = !devmode;
                    localStorage.devmode = '' + +next;
                    GLOBAL_STATE.set('devmode', next)
                }}>
                    <i class=material-icons role=presentation>bug_report</i>
                    ${translate('etc.devmode')}
                    <${Switch} checked=${devmode}/>
                </a>
            </div>
        `
    }
}

export default connect(state => ({
    devmode: state.get('devmode'),
    translate: state.get('translate'),
}))(Menu)
