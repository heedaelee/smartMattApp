/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { registerLocalNotification } from '~/lib/Notification';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/modules';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const {notification} = remoteMessage;
  registerLocalNotification(notification.title, notification.body);
});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
