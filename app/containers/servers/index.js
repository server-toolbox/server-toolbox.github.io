import { html, Component } from '../../components/3rd-party/preact.js'
import servers from '../../components/servers.js'
import { connect } from '../../components/globalState.js'
import { setIntervalImmediate } from '../../components/helpers.js'
import { memUsage, cpuUsage } from '../../components/remoteDataControllers.js'

class Percentage extends Component{
    render(){
        const { value } = this.props;
        return html`<span class=${value <= 20 ? 'low' : value >= 80 ? 'high' : 'average'}>${value}%</span>`
    }
}

const Server = class extends Component{
    state={
        load: 0,
    }
    componentDidMount(){
        this.interval = setIntervalImmediate(async () => {
            const { connection } = this.props;
            const [ { used, total, usedSwap, totalSwap }, {cpu} ] = await Promise.all([
                memUsage(connection),
                cpuUsage(connection),
            ]);
            const memUsed = Math.round((used + usedSwap) / (total + totalSwap) * 100);
            this.setState({
                load: Math.round(Math.max(memUsed, cpu))
            })
        }, 2000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        const { server, translate } = this.props;
        const { load } = this.state;
        return html`<div class=mdl-block>
            ${server.name}
            <span class=load>${translate('servers.load')} <${Percentage} value=${load}/></span>
        </div>`
    }
}

class Container extends Component{
    render(){
        const { connections, translate } = this.props;
        return html`<div class='mdl-block server-list'>
            <h1>${translate('servers.list')}</h1>
            ${servers.map((server, i) => html`<${Server} server=${server} connection=${connections[i]} translate=${translate}/>`)}
        </div>`
    }
}

export default connect(state => ({
    connections: servers.map((_, i) => state.get('connection' + i)),
    translate: state.get('translate')
}))(Container)
