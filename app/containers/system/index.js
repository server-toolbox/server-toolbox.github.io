import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { sysInfo } from '../../components/remoteDataControllers.js'

function getCPUString(cpu, translate){
    const processors = {};
    const proc_count = cpu.info.processors.length;
    for(const processor of cpu.info.processors){
        for(const i in processor){
            if(i.toLowerCase() === 'model name') processors[processor[i]] = (processors[processor[i]] || 0) + 1;
        }
    }
    if(!Object.keys(processors).length) return translate('errors.not_found');
    let recognizedCount = 0;
    let res = '';
    for(const processor in processors){
        const count = processors[processor];
        res += `${count}x ${processor}`;
        recognizedCount += count;
    }
    const unknownCount = proc_count - recognizedCount;
    if(unknownCount){
        if(res) res += ', ';
        res += `${unknownCount}x ${translate('errors.unknown')}`
    }
    return res
}

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
            const { os, hardware } = info;
            return html`<div class='material block system-info'>
                <div class=basename>${server.name}</div>
                <div>
                    <div class=osicon style=${`background-image:url(${os.icon})`}/>
                    <div class=osname>${os.name} ${os.codename}</div>
                    <div class=osver>${translate('system.os.version')} ${os.version}</div>
                    <div class=ostype>${translate('system.os.type')} ${os.type}</div>
                    <a href=${os.links.home} target=blank>${translate('system.os.homepage')}</a><br/>
                    <a href=${os.links.support} target=blank>${translate('system.os.supportpage')}</a>
                </div>
                ${hardware ? html`<div>
                    ${ hardware.brand && hardware.model ? html`<div class=hwmodel>${hardware.device || `${hardware.brand} ${hardware.model}`}</div>` : null}
                    ${ hardware.cpu ? html`<div class=cpu><span>${translate('system.hardware.cpu')}</span> ${getCPUString(hardware.cpu, translate)}</div>` : null}
                    ${ hardware.ram ? html`<div class=ram><span>${translate('system.hardware.ram')}</span> ${hardware.ram}</div>` : null}
                    ${ hardware.board ? html`<div class=motherboard><span>${translate('system.hardware.board')}</span> ${hardware.board}</div>` : null}
                </div>` : null}
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
