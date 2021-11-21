/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {AppState, PushNotificationIOS} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const registerLocalNotification = (title?: string, message?: string) => {
  console.log('[Notification]registerLocalNotification() 호출 ');

  PushNotification.setApplicationIconBadgeNumber(0);
    console.log(`setApplicationIconBadgeNumber() 호출`);

    // Cancels all scheduled notifications AND clears the notifications alerts that are in the notification centre.
    PushNotification.cancelAllLocalNotifications();
    console.log(`cancelAllLocalNotifications() 호출`);

  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'default-channel-id',
    vibrate: true,
    vibration: 300,
    priority: 'high',
    visibility: 'public',
    importance: 'high',
    onlyAlertOnce: true,

    /* iOS and Android properties */
    title: title ? title : 'Local Notification', // (optional)
    message: message ? message : 'My Notification Message', // (required)
    playSound: false,
    number: 1,
    // actions: ['OK'],
  });
};

export default {
  register: async () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        //토큰 출력위해
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote is received or opened, or local notification is opened

      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        // process the notification
        registerLocalNotification(notification.title, notification.message);

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    });

    // NOTE: 일단 앱 켜질때 clear하고 cancel은 보류하는걸로,, 확인해야 지워지는게 맞으니..
    // Clear badge number at start
    PushNotification.setApplicationIconBadgeNumber(0);
    console.log(`setApplicationIconBadgeNumber() 호출`);

    // Cancels all scheduled notifications AND clears the notifications alerts that are in the notification centre.
    PushNotification.cancelAllLocalNotifications();
    console.log(`cancelAllLocalNotifications() 호출`);

    PushNotification.getChannels(function (channels) {
      console.log(`[Notification]getChannels() : ${channels}`);
    });
  },

  createDefaultChannels: () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: `Default channel`, // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  },

  //아래 계속 추가
};
