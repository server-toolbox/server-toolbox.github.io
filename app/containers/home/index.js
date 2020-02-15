import { html, Component } from '../../components/3rd-party/preact.js'
import SSH from '../../components/ssh.js'
import servers from '../../components/servers.js'

export default class extends Component{
    componentDidMount(){
        const client = new SSH(servers[0]);
        setInterval(async () => {
            await client.exec('cat /proc/stat', {}, 'cpuUsage')
        }, 5000)
    }
    render(){
        return html`<div class=mdl-block>
            Home
        </div>`
    }
}
