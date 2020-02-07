import html, { Component } from '../preact.js'

function round(num, base){
    return Math.round(num * base) / base
}

const height = 195.98;
const width = 469.3;
const maxTopPosition = 26.72;

function path(maxVal, points){
    const interval = width / (points.length - 1);
    const valueInterval = height / maxVal;
    let pointPosition = 0;
    let res = `${width},${maxTopPosition + height} 0,${maxTopPosition + height} `;
    for(const point of points){
        res += `${
            round(pointPosition, 100)
        },${
            round(maxTopPosition + height - point * valueInterval, 100)
        } `;
        pointPosition += interval
    }
    return res
}

export default class extends Component{
    render(){
        const { maxVal, points, color } = this.props;
        return html`<polygon fill=${color} stroke-miterlimit='10' points=${path(maxVal, points)}/>`
    }
}
