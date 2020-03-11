import { html, Component } from '../3rd-party/preact.js'

export default class extends Component{
    state = {}
    render(){
        const { icon, children, class: className, align } = this.props;
        const { active, x, y, width, height } = this.state;
        const childCount = typeof children === 'string' ? 1 : children ? children.length || 1 : 0;
        return html`<button class=${'material contextual' + (active ? ' open ' : ' ') + className} onclick=${({ target }) => {
            const { x, y, width, height } = target.getBoundingClientRect();
            this.setState({ active: true, x, y, width, height })
        }}>
            <i class=material-icons role=presentation>${icon}</i>
        </button>
        <div class=contextual-popup-bg onclick=${() => this.setState({ active: false })}/>
        <div class=${'contextual-popup-fg ' + (align === 'right' ? 'align-right' : 'align-left')} style=${`--btn-x:${x};--btn-y:${y};--btn-width:${width};--btn-height:${height};--window-width:${window.innerWidth};--child-count:${childCount}`}>
            <ul>${children}</ul>
            <div/>
        </div>`
    }
}
