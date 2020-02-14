type Args<F> = F extends (...args: infer A) => any ? A : F extends (...args: infer A) => void ? A : never

export default Args
