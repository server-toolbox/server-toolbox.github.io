import html, { render } from './components/preact.js'
import App from './containers/main.js'

const { body } = document;

// clear body before render
body.innerHTML = '';

render(html`<${App}/>`, body)
