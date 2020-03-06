Notification.requestPermission();

export default async message => {
    if(!window.notifyPermission) return;
    console.log('PUSHING MESSAGE', message);
    const reg = await window.swRegistration;
    const { title } = message;
    delete message.title;
    return reg.showNotification(title, message)
}
