import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import Server from './single.js'
import Button from '../../components/material/button/index.js'
import { createNew } from '../../components/servers.js'
import { HeaderText } from '../header.js'

class Container extends Component{
    render(){
        const { connections, translate, servers } = this.props;
        return html`<div class=server-list>
            <${HeaderText}>${translate('servers.list')}</${HeaderText}>
            ${servers.map((server, i) => html`<${Server} server=${server} connection=${connections[i]} translate=${translate}/>`)}
            <${Button} class=add-server-btn icon=add onclick=${createNew}/>
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
