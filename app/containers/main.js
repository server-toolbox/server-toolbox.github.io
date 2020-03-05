import { html, Component } from '../components/3rd-party/preact.js'
import Menu from './menu/index.js'
import * as containers from './index.js'
import Head from './header.js'

export default class extends Component{
    state = {
        container: 'home',
        headingText: '',
    }
    render(){
        const { container, headingText, menuActive } = this.state;
        return html`
            <div id=menu class=${menuActive ? 'active' : ''}><div class=bg onclick=${() => this.setState({ menuActive: false })}/><${Menu} setMainContainerState=${this.setState.bind(this)} container=${container}/></div>
            <div id=contents>
                <header><${Head} text=${headingText} menuClick=${() => this.setState({ menuActive: true })}/></header>
                <${containers[container]}/>
            </div>
        `
    }
}
