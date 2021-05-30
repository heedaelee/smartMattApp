/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text} from 'react-native';
import {UserContext} from '~/lib/userProvider/UserProvider';
import Tabs from '../Tabs';

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const HomeStack = ({}) => {
  //TEST
  // const {logout} = useContext(UserContext);
  return (
    // <Button title={'logout'} onPress={() => logout()} />
    <Tabs
      firstTabName={'환자목록'}
      secondTabName={'실시간 센서'}
    />
  );
};

export default HomeStack;
