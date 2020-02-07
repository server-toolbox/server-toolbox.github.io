import { html, Component } from '../components/3rd-party/preact.js'
import Chart from '../components/chart.js'
import { connect } from '../globalState.js';

class App extends Component{
    render(){
        return html`<div>${this.props.test}
            <${Chart} points=${{
                '18:00': [33, 88],
                '18:01': [37, 88],
                '18:02': [0, 88, 33],
                '18:03': [44, 100],
                '18:04': [77, 88],
                '18:05': [33, 88],
            }} colors=${[
                '#f008',
                '#00f8',
                '#0f08',
            ]} textColor=#888 maxVal=${100}/>
        </div>`
    }
}

export default connect(state => ({
    translate: state.get('translate')
}))(App)
