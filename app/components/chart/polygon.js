import html, { Component } from '../preact.js'

function round(num, base){
    return Math.floor(num * base) / base
}

const height = 222.7;
const width = 469.3;

function path(maxVal, points){
    const interval = width / (points.length - 1);
    const valueInterval = height / maxVal;
    let pointPosition = 0;
    let res = `${width},${height} 0,${height} `;
    for(const point of points){
        res += `${
            round(pointPosition, 100)
        },${
            round(height - point * valueInterval, 100)
        } `;
        pointPosition += interval
    }
    return res
}

export default class extends Component{
    render(){
        const { maxVal, points } = this.props;
        return html`<polygon stroke-miterlimit="10" points=${path(maxVal, points)}/>`
    }
}
