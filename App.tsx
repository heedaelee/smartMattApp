/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Platform, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components';
import {
  UserContext,
  UserProvider,
} from '~/lib/userProvider/UserProvider';
import Theme from './src/lib/Theme';
import HomeRouter from './src/routes/HomeRouter';
import LoginRouter from './src/routes/LoginRouter';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);

  //FORTEST: 작동하는 기능. For TEST 주석처리
  /* origin */
  // const isLogin = useSelector(
  //   (state: RootState) => state.user.isLogin,
  // );
  /* Temp */
  const isLogin = true;

  const {getUserInfo} = useContext(UserContext);

  useEffect(() => {
    if (Platform.OS === 'android') askPermission();
    autoLogin();
  }, []);

  const askPermission = async () => {
    try {
      const result = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (result !== RESULTS.GRANTED) {
        Toast.show(
          '권한설정을 해주세요. 기기설정이 제한됩니다.',
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const autoLogin = async () => {
    await AsyncStorage.getItem('@loginInfo').then(
      (res: any) => {
        const data = JSON.parse(res);
        if (data != null) {
          //TODO: 나중에 서버랑 Token 비교
        }
      },
    );
  };

  console.log(
    `App랜더링 하고 값 ${JSON.stringify(isLogin)}`,
  );
  //TODO: user 정보 가져오기

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

  useEffect(() => {
    //스플래쉬 달면.. 나중에
    // setTimeout(() => {
    //   SplashScreen.hide();
    //   loadUserData();
    // }, 1500);
    loadUserData();
  }, [loadUserData]); */

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <ThemeProvider theme={Theme}>
            {/* <Provider store={store}> */}
            <UserProvider>
              {/* TODO: UserProvider 달기 : 로그인 storage 모듈 */}
              {isLogin ? <HomeRouter /> : <LoginRouter />}
            </UserProvider>
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
