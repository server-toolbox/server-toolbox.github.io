import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { cssifyName } from '../../components/helpers.js'


function serviceState(containers){
    let running = 1,
        error = 1,
        paused = 1,
        restarting = 0,
        stopped = 1;
    
    for(const { State: { Running, Dead, ExitCode, OOMKilled, Restarting, Paused } } of containers){
        running &= Running;
        error &= Dead & ExitCode | OOMKilled;
        stopped &= Dead & !ExitCode;
        restarting |= Restarting;
        paused &= Paused;
    }
    return {
        running: Boolean(running),
        error: Boolean(error),
        paused: Boolean(paused),
        restarting: Boolean(restarting),
        stopped: Boolean(stopped),
        partialRunning: !running && !error && !paused && !stopped,
    }
}

function stateToText(state){
    let res = '';
    for(const key in state) if(state[key]) res += ' ' + key;
    return res
}

class Service extends Component{
    render(){
        const { name, containers, server, translate } = this.props;
        const state = serviceState(containers);
        console.log('Service ' + name + ' state:', state);

        return html`<div class=${'material block containers service' + cssifyName(stateToText(state))}>
            <h4>${name} (${server})</h4>
            ${containers.map(v => html`<div class='material block'>
                <!--
                <h5>${v.Name}</h5>
                <div>
                    <span>${translate('containersContainer.services.id')}</span>
                    ${v.Id}
                </div>
                <div>
                    <span>${translate('containersContainer.services.created')}</span>
                    ${new Date(v.Created).toLocaleString()}
                </div>
                <div class=container-state data-status=${v.State.Status}>
                    <span>${translate('containersContainer.services.state')}</span>
                    ${JSON.stringify(v.State)}
                </div>
                ${JSON.stringify(v)}
                -->
            </div>`)}
        </div>`
    }
}

export default connect(state => ({
    translate: state.get('translate'),
}))(Service)
