/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Platform, LogBox, Alert} from 'react-native';
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
import Notification from '~/lib/Notification';
import {useLoggedUser} from '~/hooks/useReduce';
import Axios from 'axios';
import {Alarm, Auth, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';

const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);

  /* origin */
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const userId = useSelector((state: RootState) => state.user.id);
  const fcm_token = useSelector((state: RootState) => state.user.fcm_token);
  const {getUserInfo, setUserInfo} = useContext(UserContext);
  const [userState, setUserReducer] = useLoggedUser();

  useEffect(() => {
    if (Platform.OS === 'android') askPermission();
    autoLogin();
    console.log('app.tsx 호출');
    Notification.register(userId, setUserReducer);
    Notification.createDefaultChannels();
    //TODO: 2. if isLogin true고 isFcbToken true이면 서버에 호출. insert

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

    // return unsubscribe;
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
