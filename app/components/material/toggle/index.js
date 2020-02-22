import { html, Component } from '../../3rd-party/preact.js'
import rand from '../../rand.js'

export default class extends Component{
    id = rand()
    render(){
        return html`<i class='material toggle'>
            <input type=checkbox id=${this.id} ...${this.props}/>
            <label for=${this.id} class=off><i class=material-icons>toggle_off</i></label>
            <label for=${this.id} class=on><i class=material-icons>toggle_on</i></label>
        </i>`
    }
}
