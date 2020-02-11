export default class Core{
    /**
     * Connect to SSH server through WebSocket
     */
    connect(host: string, path?: string, port?: number | string, ssl?: boolean): Promise<void>
}
