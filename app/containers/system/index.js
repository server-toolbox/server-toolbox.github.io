import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { sysInfo } from '../../components/remoteDataControllers.js'

class Home extends Component{
    render(){
        const { connections, servers, translate } = this.props;
        const sysInfos = connections.map(c => sysInfo.bind(null, c));
        console.log({ sysInfos });
        return html`<div class='material block'>sys info</div>`
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
