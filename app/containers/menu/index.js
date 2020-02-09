import { html, Component } from '../../components/3rd-party/preact.js'
import Link from './link.js'

export default class Menu extends Component{
    render(){
        const { setMainContainerState, container } = this.props;
        const _ = { setMainContainerState, container };
        return html`
            <header>
                <img src="https://getmdl.io/templates/dashboard/images/user.jpg"/>
                <span>hello@example.com</span>
            </header>
            <nav>
                <${Link} icon=home name=home ...${_}/>
            </nav>
        `
    }
}
