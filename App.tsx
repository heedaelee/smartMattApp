/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Platform, LogBox, Alert, PushNotificationIOS} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components';
import {UserContext, UserProvider} from '~/lib/userProvider/UserProvider';
import Theme from './src/lib/Theme';
import HomeRouter from './src/routes/HomeRouter';
import LoginRouter from './src/routes/LoginRouter';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {RootState} from '~/modules';
import messaging from '@react-native-firebase/messaging';
import {createDefaultChannels, registerLocalNotification} from '~/lib/Notification';
import {useLoggedUser} from '~/hooks/useReduce';
import Axios from 'axios';
import {Alarm, Auth, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import PushNotification, { ReceivedNotification } from 'react-native-push-notification';

let global_fcm_token: string;

const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);

  /* origin */
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const userId = useSelector((state: RootState) => state.user.id);
  const fcm_token = useSelector((state: RootState) => state.user.fcm_token);
  const state = useSelector((state: RootState) => state);
  const {getUserInfo, setUserInfo} = useContext(UserContext);
  const [userState, setUserReducer] = useLoggedUser();

  useEffect(() => {
    if (Platform.OS === 'android') askPermission();
    autoLogin();
    console.log('app.tsx 호출');
    // register();
    createDefaultChannels();

    //FORTEST: 21/10/25 Foreground Push Noti 테스트용
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('푸시메시지 호출');
    //   // if(remoteMessage?.notification?.title ){
    //   // }
    //   const title = remoteMessage?.notification?.title
    //     ? remoteMessage?.notification?.title
    //     : '';
    //   const body = remoteMessage?.notification?.body
    //     ? remoteMessage?.notification?.body
    //     : '';

    //   console.log(`포그라운드일때 received title : ${title},  body : ${body}`);
    //   Alert.alert(title, body);
    // });
    // //Background Push Noti 테스트용
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('백그라운드 메시지가 왔어용', remoteMessage);
    // });

    // background message listener
    const messageListener = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });

    // return unsubscribe;
    return messageListener;
  }, []);

  useEffect(() => {
    if (userId && fcm_token) {
      console.log('====================================');
      console.log(userId, fcm_token);
      console.log('====================================');

      /**
       * 기능 : fcb token 등록하기
       * 작업일 : 11/24
       * out: {userId:string, fcm_token:string}
       * in: {success=true, message = success/empty params/db update error}
       */
      const postData = JSON.stringify({
        userId: userId,
        fcm_token: fcm_token,
      });

      Axios.post(NODE_API + Alarm.UPDATE_FCBTOKEN_API, postData, jsonHeader)
        .then(res => {
          console.log('fcb token insert API res:');
          console.log(res);
          const {success, message} = res.data;
          // response : success
          if (success) {
            console.log(`fcb token insert API success `);
          } else {
            console.log(`fcb token insert API fail`);
            (message === 'empty params' || 'db update error') && console.log(message);
          }
        })
        .catch(err => {
          console.log(`에러 : ${err}`);
          Alert.alert('에러', JSON.stringify(err));
        });
    }
  }, [userId, fcm_token]);

  const askPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result !== RESULTS.GRANTED) {
        Toast.show('권한설정을 해주세요. 기기설정이 제한됩니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const autoLogin = () => {
    getUserInfo();
  };

  const Stack = createStackNavigator();
  console.log(`App랜더링 하고 값 ${JSON.stringify(isLogin)}`);

  /* LocalStorage에 getToken하여 choicing router 하는 방법
    -> 변경: redux state 사용, isLogin을 Toggle로 함
    그래서 일단 백업!!
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loadUserData = useCallback(async () => {
    let token = '';
    await AsyncStorage.getItem('@loginInfo')
      .then(value => {
        if (value && !isLogin) {
          console.log(`loadUserData 로그인 성공`);
          setIsLogin(true);
        } else if (!value && isLogin) {
          console.log(`loadUserData 로그인 안됨`);
          setIsLogin(false);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [isLogin]);

  //스플래쉬 달면.. 나중에
    useEffect(() => {
      // setTimeout(() => {
      //   SplashScreen.hide();
      //   loadUserData();
      // }, 1500);
      loadUserData();
    }, [loadUserData]); */

  async function register() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        //토큰 출력위해
        console.log('TOKEN:', token);
        //TODO: 1. 토큰 set LocalStorage에 redux로
        global_fcm_token = token.token;

        setUserReducer && setUserReducer({fcm_token: token.token});
      },
      // (required) Called when a remote is received or opened, or local notification is opened

      onNotification: function (notification: Omit<ReceivedNotification, 'userInfo'>) {
        console.log('NOTIFICATION:', notification);
        // process the notification

        /**
         * 기능 : fcb alarm data -> db alarm 테이블 입력
         * 작업일 : 11/24
         * out: data = {title, message, caregiver_id}
         * in: {success:boolean, message = success/empty params/db update error}
         */
        const {title, message} = notification;
        console.log('====================================');
        console.log(state);
        global_fcm_token && console.log(global_fcm_token);
        console.log('===================================='); 
        const postData = JSON.stringify({
          title: title,
          message: message,
          caregiver_id: userId,
        });

        console.log('[onNotification] postData : ');
        console.log(postData); 
        Axios.post(NODE_API + Alarm.CREATE_ALARM_API, postData, jsonHeader).then(res => {
          console.log(res);
          const {success, message} = res.data; 
          if (success) {
            console.log(`Alarm message insert API success `);  
          } else { 
            console.log(`Alarm message insert API fail`);
            (message === 'empty params' || 'db insert error') && console.log(message);
          }
        });

        registerLocalNotification(notification.title, notification.message, notification.userInteraction);
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
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <ThemeProvider theme={Theme}>
            {/* <Provider store={store}> */}
            <UserProvider>{isLogin ? <HomeRouter /> : <LoginRouter />}</UserProvider>
            {/* </Provider> */}
          </ThemeProvider>
        </ApplicationProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3143e8',
  },
});

export default App;
