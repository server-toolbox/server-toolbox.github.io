import { html, Component } from '../../components/3rd-party/preact.js'
import SSH from '../../components/ssh.js'

export default class extends Component{
    componentDidMount(){
        const client = new SSH;
        client.connect()
    }
    render(){
        return html`<div class=mdl-block>
            Home
        </div>`
    }
}
