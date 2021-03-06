import FunctionArgs from '../../indirectTypings/functionArgs'

export function setIntervalImmediate(...args: FunctionArgs<typeof setInterval>): ReturnType<typeof setInterval>

export function formatTime(date: Date): string

export function humanifySize(bytes: number): string

export function cssifyName(jsname: string): string
