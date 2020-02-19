import { html, Component } from '../../components/3rd-party/preact.js'
import servers from '../../components/servers.js'
import { connect } from '../../components/globalState.js'

class Percentage extends Component{
    render(){
        const { value } = this.props;
        return html`<span class=${value <= 20 ? 'low' : value >= 80 ? 'high' : 'average'}>${value}%</span>`
    }
}

const Server = class extends Component{
    render(){
        const { server, connection, translate } = this.props;
        return html`<div class=mdl-block>
            ${server.name}
            <span class=load>${translate('servers.load')} <${Percentage} value=${81}/></span>
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
