import { html, Component } from '../../components/3rd-party/preact.js'
import Chart from '../chart.js'
import { memUsage } from '../remoteDataControllers.js'
import { setIntervalImmediate, formatTime } from '../helpers.js'

function humanify(num){
    return '1G'
}

const colors = [
    '#ff08',
    '#00f8',
]

export default class extends Component{
    state = {
        data: {},
    }
    componentDidMount(){
        this.interval = setIntervalImmediate(async () => {
            const { used, total, usedSwap, totalSwap } = await memUsage(this.props.connection);
            this.maxVal = Math.max(total, totalSwap);
            const { data } = this.state;
            const keys = Object.keys(data);
            let j = 0;
            for(let i = keys.length - 19; i > 0; i--) delete data[keys[j++]];
            this.setState({
                data: Object.assign({}, this.state.data, {
                    [formatTime(new Date)]: [ used, usedSwap ],
                })
            })
        }, 5000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        return html `<${Chart}
            points=${this.state.data}
            colors=${colors}
            textColor=#888
            maxVal=${this.maxVal}
            valuesProcessor=${humanify}
        />`
    }
}
