/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert} from 'react-native';
import Theme from '~/lib/Theme';
import HeatMap from './HomeStack/HeatMap';
import PatientList from './HomeStack/PatientList';

const Tab = createMaterialTopTabNavigator();

type TabRouterProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: RouteProp<HomeStackNaviParamList, any>;
};

const TabRouter = ({navigation, route}: TabRouterProps) => {
  console.log(' Home tab라우터');
  console.log(navigation);
  console.log(route.params);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0E76FF',
        labelStyle: {
          fontSize: Theme._HEIGHT / 48,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
      }}>
      <Tab.Screen name={'환자 목록'} component={PatientList} />
      <Tab.Screen
        listeners={{
          tabPress: e => {
            Alert.alert('환자부터 선택해주세요');
            e.preventDefault();
          },
        }}
        name={'실시간 센서'}
        component={HeatMap}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
