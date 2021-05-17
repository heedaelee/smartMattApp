/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Theme, { ITheme } from './src/lib/Theme';
import { store } from './src/modules';
import HomeRouter from './src/routes/HomeRouter';
import LoginRouter from './src/routes/LoginRouter';

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
          <Provider store={store}>
            {userInfo ? <HomeRouter /> : <LoginRouter />}
          </Provider>
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
