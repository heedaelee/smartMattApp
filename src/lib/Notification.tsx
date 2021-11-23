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
import { Device, jsonHeader, NODE_API } from './apiSite/apiSite';

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

export default {
  register: async (userId?: string) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        //토큰 출력위해
        console.log('TOKEN:', token);
        //TODO: 1. 토큰 set LocalStorage에 redux로
      },
      // (required) Called when a remote is received or opened, or local notification is opened

      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        // process the notification

        //DB추가 out data = {title:'string', message:'string', caregiver_id}
        const {title, message} = notification;
        const postData = JSON.stringify({
          title: title,
          message: message,
          caregiver_id: userId,
        });
        console.log('[onNotification] : ');
        console.log(postData);
        Axios.post(NODE_API + Device.IS_DEVICE_API, postData, jsonHeader).then(res => {
          if (res.data.success) {
            //이 유무체크는 이메일등과 반대로, 있어야 하는거니깐, if(hasCode)=> success
            //DeivceCode 존재한다면,
            if (res.data.hasCode) {
              //Code가 등록되었냐? 아님 미등록이냐?
              console.log('====================================');
              console.log(res.data.usedCode);
              console.log('====================================');
              if (res.data.usedCode) {
                //등록되어 있을떄
                Alert.alert('이미 추가된 환자입니다');
                return;
              } else {
                //등록되어 있지 않을때
                //환자 id가 있으면,
                if (res.data.patient_id) {
                  navigation.navigate('PatientEditor', {
                    screen: '환자 추가',
                    deviceCode,
                    patient_id: res.data.patient_id,
                  });
                } else {
                  console.log('patient_id 받아오기 실패');
                }
              }
            } else {
              //DeivceCode 비존재
              setCheckedExist('fail');
            }
          } else {
            console.log('DeviceCodeCheckSubmit server api fail');
            console.log(res.data);
          }
        });

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
