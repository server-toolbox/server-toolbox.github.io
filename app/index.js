import html, { render } from './components/preact.js'
import App from './containers/main.js'

render(html`<${App}/>`, document.body)
