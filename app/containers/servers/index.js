import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import Server from './single.js'

class Container extends Component{
    render(){
        const { connections, translate, servers } = this.props;
        return html`<div class=server-list>
            <h1>${translate('servers.list')}</h1>
            ${servers.map((server, i) => html`<${Server} server=${server} connection=${connections[i]} translate=${translate}/>`)}
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
})(Container)
