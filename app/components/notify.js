const pushSubscription = swRegistration.then(reg => reg.pushManager.subscribe());

export default async message => {
    console.log('PUSHING MESSAGE', message, 'with subscription', pushSubscription);
    const reg = await swRegistration;
    const { title } = message;
    delete message.title;
    return reg.showNotification(title, message)
}
