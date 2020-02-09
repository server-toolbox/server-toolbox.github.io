import { registerAsyncComponent } from '../globalState.js'
import sass from './sass.js'
import { styles } from '../path.js'

registerAsyncComponent('styles', (async () => {
    const src = await fetch(styles + '/main.scss').then(r => r.text())
    return await (await sass).compile(src)
})())
