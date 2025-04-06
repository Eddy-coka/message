import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "messages-channel", 
    channelName: "Messages Notifications",
    importance: 4, 
    vibrate: true,
  },
  (created) => console.log(`Channel created: ${created}`)
);

export const sendLocalNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    channelId: "messages-channel",
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
    importance: 'high',
  });
};
