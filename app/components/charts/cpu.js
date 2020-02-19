import { html, Component } from '../../components/3rd-party/preact.js'
import Chart from '../chart.js'
import { cpuUsage } from '../remoteDataControllers.js'
import { setIntervalImmediate } from '../helpers.js'

const colors = [
    '#f008',
    '#00f8',
    '#0f08',
    '#f008',
    '#00f8',
    '#0f08',
    '#f008',
    '#00f8',
    '#0f08',
]

function _p(num){
    return `${num < 10 ? '0' : ''}${num}`
}

function formatTime(date){
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${_p(h)}:${_p(m)}:${_p(s)}`
}

export default class extends Component{
    state = {
        data: {},
    }
    componentDidMount(){
        this.interval = setIntervalImmediate(async () => {
            const values = await cpuUsage(this.props.connection);
            const { data } = this.state;
            const keys = Object.keys(data);
            let j = 0;
            for(let i = keys.length - 19; i > 0; i--) delete data[keys[j++]];
            this.setState({
                data: Object.assign({}, this.state.data, {
                    [formatTime(new Date)]:
                        Object.keys(values).filter(name => name !== 'cpu').map(name => values[name]),
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
            maxVal=${100}
        />`
    }
}
