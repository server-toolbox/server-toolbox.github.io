import { html, Component } from '../components/3rd-party/preact.js'
import Menu from './menu/index.js'
import * as containers from './index.js'

export default class App extends Component{
    state = { container: 'home' }
    render(){
        const { container } = this.state;
        return html`
            <div id=menu><${Menu} setMainContainerState=${this.setState.bind(this)} container=${container}/></div>
            <div id=contents><${containers[container]}/></div>
        `
    }
}
