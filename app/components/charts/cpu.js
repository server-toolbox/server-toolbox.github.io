import { html, Component } from '../../components/3rd-party/preact.js'
import Chart from '../chart.js'
import { cpuUsage } from '../remoteDataControllers.js'

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

function setIntervalImmediate(handler, timeout, ...args){
    handler();
    setInterval(handler, timeout, ...args)
}

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
        setIntervalImmediate(async () => {
            const values = await cpuUsage(this.props.connection);
            this.setState({
                data: Object.assign({}, this.state.data, {
                    [formatTime(new Date)]:
                        Object.keys(values).filter(name => name !== 'cpu').map(name => values[name]),
                })
            })
        }, 5000)
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
