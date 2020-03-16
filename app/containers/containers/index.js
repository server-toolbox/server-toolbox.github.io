import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { containersList } from '../../components/remoteDataControllers.js'

let setUngroupedState = () => {}

class Ungrouped extends Component{
    constructor(props){
        super(props);
        setUngroupedState = this.setState.bind(this)
    }
    state = {}
    render(){
        console.log('Ungrouped.state:', this.state);
        return null
    }
}

const Service = connect(state => ({
    translate: state.get('translate'),
}))(class extends Component{
    render(){
        const { name, containers, server, translate } = this.props;
        return html`<div class='material block containers service'>
            <h4>${name} (${server})</h4>
            ${containers.map(v => html`<div class='material block'>
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
            </div>`)}
        </div>`
    }
})

class IterableObj{
    *[Symbol.iterator](){
        for(const i in this) yield { key: i, val: this[i] }
    }
}

class Services extends Component{
    state = {
        execResult: {
            grouped: {},
            ungrouped: [],
        }
    }
    componentDidMount(){
        const { client } = this.props;
        client && containersList(client).then(v => {
            this.setState({
                execResult: v
            })
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        const { client: nextClient } = nextProps;
        if(nextClient !== this.props.client){
            containersList(nextClient).then(v => {
                this.setState({
                    execResult: v
                })
            });
            return false
        }
        return JSON.stringify(nextState.execResult) !== JSON.stringify(this.state.execResult)
    }
    render(){
        const { server, client } = this.props;
        const { grouped, ungrouped } = this.state.execResult;
        setUngroupedState({ [server]: ungrouped });
        return [...Object.assign(new IterableObj, grouped)].map(({ key, val }) => html`
            <${Service} name=${key} containers=${val} server=${server} client=${client}/>
        `)
    }
}

class Containers extends Component{
    state = {}
    render(){
        const { connections, servers } = this.props;
        return connections.map((client, i) => html`
            <${Services} client=${client} server=${servers[i].name}/>
        `).concat([
            html`<${Ungrouped}/>`
        ])
    }
}

export default connect(state => {
    const servers = state.get('servers') || [];
    return {
        servers,
        connections: servers.map((_, i) => state.get('connection' + i)),
    }
})(Containers)
