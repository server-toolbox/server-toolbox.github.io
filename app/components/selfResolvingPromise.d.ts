function selfResolvingPromise(): Promise<any> & {
    resolve(value: any): void
    reject(reason: any): void
}

export default selfResolvingPromise
