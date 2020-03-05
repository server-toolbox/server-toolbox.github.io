import { html, Component } from '../components/3rd-party/preact.js'

let currentHeader;

export default class extends Component{
    state = {}
    componentDidMount(){
        currentHeader = this;
    }
    componentWillUnmount(){
        currentHeader = null;
    }
    render(){
        const { text, menuClick } = this.props;
        const { text: replaceText } = this.state;
        return html`
            <button class=menu onclick=${menuClick}><i class=material-icons>menu</i></button>
            ${replaceText === undefined ? text : replaceText }
        `
    }
}

export class HeaderText{
    render(){
        currentHeader && currentHeader.setState({ text: this.props.children })
    }
    componentWillUnmount(){
        currentHeader && currentHeader.setState({ text: undefined })
    }
}
