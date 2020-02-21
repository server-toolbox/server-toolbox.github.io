import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { setIntervalImmediate } from '../../components/helpers.js'
import { memUsage, cpuUsage } from '../../components/remoteDataControllers.js'

class Percentage extends Component{
    render(){
        const { value } = this.props;
        return html`<span class=${value <= 20 ? 'low' : value >= 80 ? 'high' : 'average'}>${value}%</span>`
    }
}

class Server extends Component{
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
            <div class=name><input disabled value=${server.name}/></div>
            <div class=load>${translate('servers.load')} <${Percentage} value=${load}/></div>
            <div class=edit-btn><i class=material-icons>keyboard_arrow_down</i></div>
        </div>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Server)
