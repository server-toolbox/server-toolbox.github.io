import { html, render } from './components/3rd-party/preact.js'
import App from './containers/main.js'
import Head from './containers/head.js'
import { waitForAsyncComponents } from './components/globalState.js'
import { root } from './components/path.js'
import './components/async/index.js'
import './components/servers.js'

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register(root + '/sw.js', { scope: '/', type:'module' }).then(reg => {
        if(reg.installing){
            console.info('Service worker installing')
        } else if(reg.waiting){
            console.info('Service worker installed')
        } else if(reg.active){
            console.info('Service worker active')
        }
    }).catch(e => {
        console.warn('Registration failed with ' + e)
    })
} else console.warn('No serviceWorker in navigator')

const { body, head } = document;

waitForAsyncComponents().then(() => {
    // clear body before render
    body.innerHTML = '';
    render(html`<${Head}/>`, head);
    render(html`<${App}/>`, body)
})
