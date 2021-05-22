/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {UserProvider} from '~/lib/userProvider/UserProvider';
import Theme, {ITheme} from './src/lib/Theme';
import {store} from './src/modules';
import HomeRouter from './src/routes/HomeRouter';
import LoginRouter from './src/routes/LoginRouter';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '~/modules';

const App = () => {
  //FORTEST: 작동하는 기능. For TEST 주석처리
  /* origin */
  // const isLogin = useSelector(
  //   (state: RootState) => state.user.isLogin,
  // );
  /* Temp */
  const isLogin = true;

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
        <ThemeProvider theme={Theme}>
          {/* <Provider store={store}> */}
          <UserProvider>
            {/* TODO: UserProvider 달기 : 로그인 storage 모듈 */}
            {isLogin ? <HomeRouter /> : <LoginRouter />}
          </UserProvider>
          {/* </Provider> */}
        </ThemeProvider>
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
