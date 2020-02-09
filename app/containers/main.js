import { html, Component } from '../components/3rd-party/preact.js'
import Menu from './menu/index.js'
import * as containers from './index.js'

export default class App extends Component{
    state = { container: 'home' }
    render(){
        return html`
            <div id=menu><${Menu} setMainContainerState=${this.setState.bind(this)}/></div>
            <div id=contents><${containers[this.state.container]}/></div>
        `
    }
}
