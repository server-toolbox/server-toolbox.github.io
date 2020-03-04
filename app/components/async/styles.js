import { registerAsyncComponent } from '../globalState.js'
import sass from './sass.js'
import { styles } from '../path.js'

async function toCSS(fname){
    const src = await fetch(styles + '/' + fname).then(r => r.text());
    const Sass = await sass;
    return Sass.compile(src)
}

registerAsyncComponent('styles', (async () => (await Promise.all([
    'global-vars.scss',
    'app.scss',
    'material-design-nano.scss',
].map(toCSS))).join('\n'))())
