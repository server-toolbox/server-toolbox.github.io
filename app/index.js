import { html, render } from './components/3rd-party/preact.js'
import App from './containers/main.js'
import Head from './containers/head.js'
import { waitForAsyncComponents } from './components/globalState.js'
import './components/async/index.js'
import SSH from './components/ssh.js'
import servers from './components/servers.js'
import { GLOBAL_STATE } from './components/globalState.js'

const { body, head } = document;

servers.forEach((server, i) => {
    const connection = new SSH(server);
    GLOBAL_STATE.set('connection' + i, connection)
});

waitForAsyncComponents().then(() => {
    // clear body before render
    body.innerHTML = '';
    render(html`<${Head}/>`, head);
    render(html`<${App}/>`, body)
})
