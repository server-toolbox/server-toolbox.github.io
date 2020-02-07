import { html, render } from './components/3rd-party/preact.js'
import App from './containers/main.js'
import { waitForAsyncComponents } from './globalState.js'
import './components/async/dictionary/index.js'

const { body } = document;

waitForAsyncComponents().then(() => {
    // clear body before render
    body.innerHTML = '';
    render(html`<${App}/>`, body)
})
