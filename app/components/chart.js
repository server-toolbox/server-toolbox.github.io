import { html, Component } from './3rd-party/preact.js'
import Polygon from './chart/polygon.js'
import Line from './chart/line.js'
import Text, { BottomText } from './chart/text.js'

function fixGraphs(graphs){
    const keys = Object.keys(graphs);
    if(keys.length === 1){
        const name = keys[0];
        const graph = graphs[name];
        return {
            '': graph,
            [name]: graph,
            ' ': graph,
        }
    }
    return graphs
}

function emptyProcessor(v){
    return v
}

export default class extends Component{
    render(){
        const { colors, maxVal, textColor } = this.props;
        const valuesProcessor = this.props.valuesProcessor || emptyProcessor;
        const graphs = fixGraphs(this.props.points);
        const names = [],
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
            names.push(html`<${BottomText} x=${nameIdx * pointInterval} y=255.0003 class=name>${name}</${BottomText}>`);
            for(let i = 0; i < graphCount; i++) (pointValues[i] = pointValues[i] || []).push(graphs[name][i] || 0);
            nameIdx++
        }

        const polygons = pointValues.map(points => html`
            <${Polygon} color=${nextColor()} points=${points} maxVal=${maxVal}/>
        `)

        return html`<svg viewBox="0 0 500 250" style="overflow:unset">
            <defs/>
            <style>line{stroke:${textColor}}line,text{fill:${textColor}}text{font-family:Roboto;font-size:9px;pointer-events:none}.name>text{transform:rotate(-45deg)}</style>
            <${Line} height=27.3/>
            <${Line} height=66.7/>
            <${Line} height=105.3/>
            <${Line} height=144.7/>
            <${Line} height=184.3/>
            <${Text} x=475 y=29.3333>${valuesProcessor(maxVal)}</${Text}>
            <${Text} x=475 y=69>${valuesProcessor(maxVal / 5 * 4)}</${Text}>
            <${Text} x=475 y=109.3333>${valuesProcessor(maxVal / 5 * 3)}</${Text}>
            <${Text} x=475 y=149>${valuesProcessor(maxVal / 5 * 2)}</${Text}>
            <${Text} x=475 y=188.3333>${valuesProcessor(maxVal / 5)}</${Text}>
            ${ names }
            ${ polygons }
        </svg>`
    }
}
