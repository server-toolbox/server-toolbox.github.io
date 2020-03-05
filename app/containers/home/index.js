import { html, Component } from '../../components/3rd-party/preact.js'
import CPUUsageChart from '../../components/charts/cpu.js'
import { connect } from '../../components/globalState.js'

class Home extends Component{
    render(){
        const { connections } = this.props;
        return html`<div class='material block'>
            <${CPUUsageChart} connection=${connections[0]}/>
        </div>`
    }
}

export default connect(state => {
    const servers = state.get('servers') || [];
    return {
        servers,
        connections: servers.map((_, i) => state.get('connection' + i)),
    }
})(Home)
