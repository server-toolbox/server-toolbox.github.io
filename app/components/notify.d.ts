import FunctionArgs from '../../indirectTypings/functionArgs'
import Unpromisify from '../../indirectTypings/unpromisify'

type SWRegistration = Unpromisify<ReturnType<typeof navigator.serviceWorker.register>>

type NotificationOptions = FunctionArgs<SWRegistration['showNotification']>[1]

export default function notify(message: NotificationOptions & {
    title: string
}): Promise<void>
