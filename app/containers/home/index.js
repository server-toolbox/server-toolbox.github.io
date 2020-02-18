import { html, Component } from '../../components/3rd-party/preact.js'
import SSH from '../../components/ssh.js'
import servers from '../../components/servers.js'
import CPUUsageChart from '../../components/charts/cpu.js'

export default class extends Component{
    render(){
        return html `<div class=mdl-block>
            <${CPUUsageChart} connection=${new SSH(servers[0])}/>
        </div>`
    }
}
