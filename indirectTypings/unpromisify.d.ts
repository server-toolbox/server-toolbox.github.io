type Unpromisify<P> = P extends PromiseLike<infer R> ? R : P

export default Unpromisify
