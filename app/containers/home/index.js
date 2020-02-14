import { html, Component } from '../../components/3rd-party/preact.js'
import SSH, { Shell } from '../../components/ssh.js'
import servers from '../../components/servers.js'
import cpuUsageParser from '../../components/cpuUsageParser.js'

export default class extends Component{
    componentDidMount(){
        const client = new SSH(servers[0]);
        const cpuUsageShell = new Shell(client, cpuUsageParser);
        cpuUsageShell.onData = console.log;
        cpuUsageShell.exec('cat /proc/stat', 'periodical', 5000)
    }
    render(){
        return html`<div class=mdl-block>
            Home
        </div>`
    }
}
