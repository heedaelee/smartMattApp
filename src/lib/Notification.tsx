/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Axios from 'axios';
import {AppState, PushNotificationIOS} from 'react-native';
import PushNotification, {
  Importance,
  PushNotificationObject,
  ReceivedNotification,
} from 'react-native-push-notification';
import {useLoggedUser} from '~/hooks/useReduce';
import {Alarm, Device, jsonHeader, NODE_API} from './apiSite/apiSite';

export const registerLocalNotification = (title?: string, message?: string) => {
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
    priority: 'max',
    visibility: 'public',
    // importance: 'high',
    importance: 'max',
    onlyAlertOnce: true,
    /* iOS and Android properties */
    title: title ? title : 'Local Notification', // (optional)
    message: message ? message : 'My Notification Message', // (required)
    playSound: false,
    number: 1,
    // actions: ['OK'],
  });
};

export const createDefaultChannels = () => {
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
};

//아래 계속 추가
