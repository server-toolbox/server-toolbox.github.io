let thisModule;
onmessage = async ({ data: { module, method, args, id } }) => {
    if(module) import(module).then(({ default: v }) => v).then(m => {
        thisModule = m;
        postMessage('load')
    }); else {
        try{
            const data = await thisModule[method](...(args || []));
            postMessage({ data, id })
        } catch(e){
            const { stack, message } = e;
            postMessage({ id, message, stack })
        }
    }
}
