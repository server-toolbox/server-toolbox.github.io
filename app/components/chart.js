import html, { Component } from './preact.js'
import Polygon from './chart/polygon.js'
import Line from './chart/line.js'
import Text from './chart/text.js'

export default class extends Component{
    render(){
        const { points: graphs, colors, maxVal, textColor } = this.props,
            names = [],
            pointValues = [],
            pointNames = Object.keys(graphs),
            pointInterval = 464.333 / (pointNames.length - 1),
            graphCount = Math.max.apply(null, pointNames.map(n => graphs[n].length));
        let colorIdx = 0,
            nameIdx = 0;

        function nextColor(){
            const color = colors[colorIdx];
            if(colorIdx === colors.length - 1) colorIdx = 0;
            else colorIdx++;
            return color
        }

        for(const name in graphs){
            names.push(html`<${Text} x=${nameIdx * pointInterval} y=249.0003 class=name>${name}</${Text}>`);
            for(let i = 0; i < graphCount; i++) (pointValues[i] = pointValues[i] || []).push(graphs[name][i] || 0);
            nameIdx++
        }

        const polygons = pointValues.map(points => html`
            <${Polygon} color=${nextColor()} points=${points} maxVal=${maxVal}/>
        `)

        return html`<svg viewBox="0 0 500 250">
            <defs/>
            <style>line{stroke:${textColor}}line,text{fill:${textColor}}text{font-family:Roboto;font-size:9px}.name~.name{text-anchor:middle}</style>
            <${Line} height=27.3/>
            <${Line} height=66.7/>
            <${Line} height=105.3/>
            <${Line} height=144.7/>
            <${Line} height=184.3/>
            <${Text} x=485 y=29.3333>${maxVal}</${Text}>
            <${Text} x=485 y=69>${maxVal / 5 * 4}</${Text}>
            <${Text} x=485 y=109.3333>${maxVal / 5 * 3}</${Text}>
            <${Text} x=485 y=149>${maxVal / 5 * 2}</${Text}>
            <${Text} x=485 y=188.3333>${maxVal / 5}</${Text}>
            ${ names }
            ${ polygons }
        </svg>`
    }
}
