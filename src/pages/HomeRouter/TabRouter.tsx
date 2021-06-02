/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HeatMapTemplate from '~/pages/HomeRouter/HomeStack/HeatMap';
import Theme from '~/lib/Theme';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import PatientList from './HomeStack/PatientList';

const Tab = createMaterialTopTabNavigator();

type TabRouterProps = {
  firstTabName: string;
  secondTabName: string;
};

const TabRouter = ({
  firstTabName,
  secondTabName,
}: TabRouterProps) => {
  return (
    <Tab.Navigator
      initialRouteName={firstTabName}
      tabBarOptions={{
        activeTintColor: '#0E76FF',
        labelStyle: {
          fontSize: Theme._HEIGHT / 48,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
      }}>
      <Tab.Screen
        name={firstTabName}
        component={PatientList}
      />
      <Tab.Screen
        name={secondTabName}
        component={HeatMapTemplate}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
