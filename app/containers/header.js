import { html, Component } from '../components/3rd-party/preact.js'
import { connect } from '../components/globalState.js'

let currentHeader;

class Header extends Component{
    state = {}
    componentDidMount(){
        currentHeader = this;
    }
    componentWillUnmount(){
        currentHeader = null;
    }
    render(){
        const { text, menuClick, devmode } = this.props;
        const { text: replaceText } = this.state;
        return html`
            <button class=menu onclick=${menuClick}><i class=material-icons>menu</i></button>
            <div id=header-content>
                <div>${replaceText === undefined ? text : replaceText }</div>
                <button class=${devmode ? 'active' : ''}><i class=material-icons role=presentation>build</i></button>
            </div>
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

export default connect(state => ({
    devmode: state.get('devmode'),
}))(Header)
