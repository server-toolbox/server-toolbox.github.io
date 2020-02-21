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
        const { load, edit } = this.state;
        console.log({this: this})
        return html`<div class=mdl-block>
            <div>
                <div class=name><input
                    disabled=${!edit}
                    value=${server.name}
                    placeholder=${translate('servers.name')}
                    onInput=${({ target }) => server.name = target.value}
                /></div>
                <div class=load>${translate('servers.load')} <${Percentage} value=${load}/></div>
                <div class=edit-btn onclick=${() => {
                    this.setState({ edit: !this.state.edit })
                }}>
                    <i class=material-icons>keyboard_arrow_${edit ? 'up' : 'down'}</i>
                </div>
            </div>${edit ? html`
                <div><input
                    value=${server.host}
                    placeholder=${translate('servers.host')}
                    onInput=${({ target }) => server.host = target.value}
                /></div>
                <div><input
                    value=${server.user}
                    placeholder=${translate('servers.user')}
                    onInput=${({ target }) => server.user = target.value}
                /></div>
            ` : null}
        </div>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Server)
