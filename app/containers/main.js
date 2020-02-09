import { html, Component } from '../components/3rd-party/preact.js'
import Menu from './menu/index.js'
import Contents from './main/index.js'

export default class App extends Component{
    render(){
        return html`
            <div id=menu><${Menu}/></div>
            <div id=contents><${Contents}/></div>
        `
    }
}
