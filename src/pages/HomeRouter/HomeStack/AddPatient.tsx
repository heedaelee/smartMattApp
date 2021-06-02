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

const AddPatient = () => {
  return <Text>AddPatient Page</Text>;
};

export default AddPatient;
