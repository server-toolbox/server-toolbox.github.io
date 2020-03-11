let permissionRequested;

function requestPermission(){
    if(permissionRequested === undefined) permissionRequested = Notification.requestPermission();
    return permissionRequested
}

export default async message => {
    if(await requestPermission() === 'granted') return;
    const reg = await window.swRegistration;
    const { title } = message;
    delete message.title;
    return reg.showNotification(title, message)
}
