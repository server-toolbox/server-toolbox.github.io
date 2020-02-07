import html, { Component } from '../preact.js'

export default class extends Component{
    render(){
        const { children, x, y } = this.props;
        return html`<text transform=${`matrix(1 0 0 1 ${x} ${y})`}>${children}</text>`
    }
}
