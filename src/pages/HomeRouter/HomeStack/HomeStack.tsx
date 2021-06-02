/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Button, Text} from 'react-native';
import {UserContext} from '~/lib/userProvider/UserProvider';
import TabRouter from '../TabRouter';
import {BottomNaviRouterProps} from '../BottomNaviRouter';
import AddPatient from './AddPatient';

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const Stack = createStackNavigator();

const HomeStack = () => {
  //TEST LogOut
  // const {logout} = useContext(UserContext);
  return (
    // <Button title={'logout'} onPress={() => logout()} />

    <Stack.Navigator
      initialRouteName="TabRouter"
      headerMode="none">
      <Stack.Screen name="TabRouter">
        {() => (
          <TabRouter
            firstTabName={'환자목록'}
            secondTabName={'실시간 센서'}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
        name={'AddPatient'}
        component={AddPatient}
      /> */}
    </Stack.Navigator>

    /* <TabRouter
      firstTabName={'환자목록'}
      secondTabName={'실시간 센서'}
    /> */
  );
};

export default HomeStack;
