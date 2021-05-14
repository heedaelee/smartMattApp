/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {store} from './src/modules';
import HomeRouter from './src/routes/HomeRouter';
import LoginRouter from './src/routes/LoginRouter';
import {ThemeProvider} from 'styled-components';
import Theme, {ITheme} from './src/lib/Theme';

type StyledProps = {
  theme: ITheme;
};

const App = () => {
  //TODO user 정보 가져오기
  const userInfo;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider theme={Theme}>
          {/* TODO: UserProvider 달기 : 로그인 storage 모듈 */}
          {/* <Provider store={store}> */}
          {userInfo ? <HomeRouter /> : <LoginRouter />}
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
