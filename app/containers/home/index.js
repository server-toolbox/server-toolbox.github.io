import { html, Component } from '../../components/3rd-party/preact.js'
import CPUUsageChart from '../../components/charts/cpu.js'
import { connect } from '../../components/globalState.js'

class Home extends Component{
    render(){
        const { connections, servers, translate } = this.props;
        return html`<div class='material block cpu-usage'>
            <h2>${translate('dashboard.cpuUsage')}</h2>
            <div>
                ${connections.map((conn, i) => html`<div class='material block'><span>${servers[i].name}<//><${CPUUsageChart} connection=${conn}/><//>`)}
            </div>
        </div>`
    }
}

export default connect(state => {
    const servers = state.get('servers') || [];
    return {
        servers,
        connections: servers.map((_, i) => state.get('connection' + i)),
        translate: state.get('translate'),
    }
})(Home)
