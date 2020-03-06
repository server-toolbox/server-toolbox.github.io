import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { setIntervalImmediate } from '../../components/helpers.js'
import { memUsage, cpuUsage } from '../../components/remoteDataControllers.js'
import Toggle from '../../components/material/toggle/index.js'
import Switch from '../../components/material/switch/index.js'
import notify from '../../components/notify.js'

class Percentage extends Component{
    render(){
        const { value } = this.props;
        return html`<span class=${value <= 20 ? 'low' : value >= 80 ? 'high' : 'average'}>${value}%</span>`
    }
}

function firstUpper(str){
    return str[0].toLocaleUpperCase() + str.slice(1)
}

class Server extends Component{
    state={
        load: 0,
        authMethod: this.props.server.authMethod,
    }
    authMethods = {
        key: this.props.translate('servers.auth.key'),
        password: this.props.translate('servers.auth.pass'),
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
        const { load, edit, authMethod } = this.state;
        return html`<div class='material block'>
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
                    type=number
                    value=${server.port}
                    placeholder=${translate('servers.port')}
                    onInput=${({ target }) => server.port = target.value}
                /></div>
                <div><input
                    value=${server.path}
                    placeholder=${translate('servers.path')}
                    onInput=${({ target }) => server.path = target.value}
                /></div>
                <div><input
                    value=${server.user}
                    placeholder=${translate('servers.user')}
                    onInput=${({ target }) => server.user = target.value}
                /></div>
                <div style='position:relative'>${translate('servers.ssl')} <${Toggle}
                    checked=${server.ssl}
                    onInput=${({ target: { checked } }) => {
                        if(checked) notify({
                            title: 'SSL Warning',
                            body: translate('servers.sslWarning'),
                        });
                        server.ssl = checked
                    }}
                /></div>
                <div>${translate('servers.auth.hint')} <${Switch}
                    active=${authMethod}
                    values=${this.authMethods}
                    onInput=${nextActive => {
                        server.authMethod = nextActive;
                        this.setState({ authMethod: nextActive })
                    }}
                /></div>${authMethod === 'password' ? html`
                    <div><input
                        value=${server.password}
                        placeholder=${firstUpper(translate('servers.auth.pass'))}
                        onInput=${({ target }) => server.password = target.value}
                    /></div>
                ` : html`
                    <div><textarea
                        placeholder=${firstUpper(translate('servers.auth.key'))}
                        onInput=${({ target }) => server.key = target.value}
                    >${server.key}</textarea></div>
                    <div><input
                        value=${server.passphrase}
                        placeholder=${translate('servers.auth.passphrase')}
                        onInput=${({ target }) => server.passphrase = target.value}
                    /></div>
                `}
            ` : null}
        </div>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Server)
