export default () => {
    let r, j;
    const promise = new Promise(($, _) => {
        r = $;
        j = _;
    });
    promise.resolve = r;
    promise.reject = j;
    return promise
}
