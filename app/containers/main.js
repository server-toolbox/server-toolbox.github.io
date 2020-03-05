import { html, Component } from '../components/3rd-party/preact.js'
import Menu from './menu/index.js'
import * as containers from './index.js'

class Head extends Component{
    state = { text: '' }
    render(){
        return html`${this.props.text}`
    }
}

export default class App extends Component{
    state = {
        container: 'home',
        headingText: '',
    }
    render(){
        const { container, headingText } = this.state;
        return html`
            <div id=menu><${Menu} setMainContainerState=${this.setState.bind(this)} container=${container}/></div>
            <div id=contents>
                <header><${Head} text=${headingText}/></header>
                <${containers[container]}/>
            </div>
        `
    }
}
