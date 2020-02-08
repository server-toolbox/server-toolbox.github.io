import { registerAsyncComponent } from '../../globalState.js'
import { up } from '../../path.js'
import jsYaml from '../../yaml.js'

const __dirname = up(import.meta.url);
const defaultLang = 'en';

async function getSrc(){
    try{
        return await fetch(`${__dirname}/${navigator.language.slice(0, 2)}.yml`).then(r => r.text())
    } catch(e){
        try{
            return await fetch(`${__dirname}/${defaultLang}.yml`).then(r => r.text())
        } catch(e){
            return ''
        }
    }
}

let dict;

registerAsyncComponent('translate', (async () => {
    const src = getSrc();
    return jsYaml.load(await src)
})().then(v => (
    dict = v,
    phrase => dictionaryRecursiveIterator(phrase.split('.'), dict, phrase)
)));

function dictionaryRecursiveIterator(phrase, currentSection, realPhrase){
    if(!currentSection) return 'Translation for ' + realPhrase + ' not found';
    if(!phrase.length) return currentSection;
    return dictionaryRecursiveIterator(phrase, currentSection[phrase.shift()], realPhrase)
}
