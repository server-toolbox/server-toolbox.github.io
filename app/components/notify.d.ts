import FunctionArgs from '../../indirectTypings/functionArgs'
import Unpromisify from '../../indirectTypings/unpromisify'

type SWRegistration = Unpromisify<typeof swRegistration>

type NotificationOptions = FunctionArgs<SWRegistration['showNotification']>[1]

export default function notify(message: NotificationOptions & {
    title: string
}): Promise<void>
