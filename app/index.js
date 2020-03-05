import { html, render } from './components/3rd-party/preact.js'
import App from './containers/main.js'
import Head from './containers/head.js'
import { waitForAsyncComponents } from './components/globalState.js'
import './components/async/index.js'
import './components/servers.js'

const { body, head } = document;

waitForAsyncComponents().then(() => {
    // clear body before render
    body.innerHTML = '';
    render(html`<${Head}/>`, head);
    render(html`<${App}/>`, body)
})
