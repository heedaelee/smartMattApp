/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import theme, {ITheme} from '../lib/Theme';
import SignIn from '../pages/LoginRouter/SignIn';
import SignUp from '../pages/LoginRouter/SignUp';
import SignUp2 from '~/pages/LoginRouter/SignUp2';
import SignUpBioDataAgree from '~/pages/LoginRouter/SignUpBioDataAgree';
import SignUpPrivateAgree from '~/pages/LoginRouter/SignUpPrivateAgree';

const Stack = createStackNavigator();

const LoginRouter = () => {
  console.log('랜더링');

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
      // NOTE: 개발시 initial 임시 조정
      initialRouteName="SignUp2">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{title: '회원가입'}}
        component={SignUp}
      />
      <Stack.Screen
        name="SignUp2"
        options={{title: '회원가입'}}
        component={SignUp2}
      />
      <Stack.Screen
        name="SignUpBioDataAgree"
        component={SignUpBioDataAgree}
      />
      <Stack.Screen
        name="SignUpPrivateAgree"
        component={SignUpPrivateAgree}
      />
    </Stack.Navigator>
  );
};

export default LoginRouter;
