/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignUp2 from '~/pages/LoginRouter/SignUp2';
import SignUpBioDataAgree from '~/pages/LoginRouter/SignUpBioDataAgree';
import SignUpPrivateAgree from '~/pages/LoginRouter/SignUpPrivateAgree';
import theme from '../lib/Theme';
import SignIn from '../pages/LoginRouter/SignIn';
import SignUp from '../pages/LoginRouter/SignUp';

const Stack = createStackNavigator<LoginStackNaviParamList>();

const LoginRouter = () => {
  console.log('로그인 라우터 랜더링');

  return (
    // FORTEST: 개발시 initial 임시 조정 : SignUp2로
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
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
