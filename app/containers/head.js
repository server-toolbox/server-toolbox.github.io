import { html, Component } from '../components/3rd-party/preact.js'
import { connect } from '../components/globalState.js'

class App extends Component{
    render(){
        const { styles } = this.props;
        return html`
            <style>${styles}</style>
        `
    }
}

export default connect(state => ({
    styles: state.get('styles')
}))(App)
