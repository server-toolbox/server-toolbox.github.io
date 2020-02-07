import html, { Component } from '../preact.js'

export default class extends Component{
    render(){
        const { height } = this.props;
        return html`<line stroke-miterlimit=10 x1=0 y1=${height} x2=468.3 y2=${height}/>`
    }
}
