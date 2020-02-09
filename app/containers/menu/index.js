import { html, Component } from '../../components/3rd-party/preact.js'
import { connect } from '../../components/globalState.js'

class Menu extends Component{
    render(){
        const { translate } = this.props;
        return html`
            Menu
        `
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(Menu)
