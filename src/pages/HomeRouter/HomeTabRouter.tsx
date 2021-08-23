/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Theme from '~/lib/Theme';
import HeatMap from './HomeStack/HeatMap';
import PatientList from './HomeStack/PatientList';

const Tab = createMaterialTopTabNavigator();


const TabRouter = () => {
  console.log(' Home tab라우터')
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
      <Tab.Screen name={'실시간 센서'} component={HeatMap} />
    </Tab.Navigator>
  );
};

export default TabRouter;
