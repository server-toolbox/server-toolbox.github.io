export default async message => {
    if(await Notification.requestPermission() === 'granted') return;
    const reg = await window.swRegistration;
    const { title } = message;
    delete message.title;
    return reg.showNotification(title, message)
}
