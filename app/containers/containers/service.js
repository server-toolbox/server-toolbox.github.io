import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'

class Service extends Component{
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
}

export default connect(state => ({
    translate: state.get('translate'),
}))(Service)
