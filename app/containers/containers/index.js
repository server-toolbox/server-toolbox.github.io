import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'
import { containersList } from '../../components/remoteDataControllers.js'
import Service from './service.js'

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
        const { connections, servers, translate } = this.props;
        return html`
            <div class='material block'>
                <h4>${translate('containersContainer.servicesListHeading')}</h4>
                ${connections.map((client, i) => html`
                    <${Services} client=${client} server=${servers[i].name}/>
                `)}
            </div>
            <${Ungrouped}/>
        `
    }
}

export default connect(state => {
    const servers = state.get('servers') || [];
    return {
        servers,
        connections: servers.map((_, i) => state.get('connection' + i)),
        translate: state.get('translate'),
    }
})(Containers)
