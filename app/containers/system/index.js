import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { sysInfo } from '../../components/remoteDataControllers.js'

class Home extends Component{
    state = {
        info: [],
    }
    async componentDidMount(){
        this.props.connections.forEach((c, i) => {
            sysInfo(c).then(v => {
                const newInfo = Array.from(this.state.info);
                newInfo[i] = v;
                this.setState({ info: newInfo })
            })
        })
    }
    render(){
        const { servers, translate } = this.props;
        return servers.map((server, i) => {
            const info = this.state.info[i];
            if(!info) return null;
            return html`<div class='material block system-info'>
                <div class=basename>${server.name}</div>
                <div>
                    <div class=osicon style=${`background-image:url(${info.os.icon})`}/>
                    <div class=osname>${info.os.name} ${info.os.codename}</div>
                    <div class=osver>${translate('system.os.version')} ${info.os.version}</div>
                    <div class=ostype>${translate('system.os.type')} ${info.os.type}</div>
                    <a href=${info.os.links.home} target=blank>${translate('system.os.homepage')}</a>
                    <a href=${info.os.links.support} target=blank>${translate('system.os.supportpage')}</a>
                </div>
                <div>
                </div>
            </div>`
        })
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
