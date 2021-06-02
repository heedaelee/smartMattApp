/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HeatMap from '~/pages/HomeRouter/HomeStack/HeatMap';
import Theme from '~/lib/Theme';
import PatientList from './HomeStack/PatientList';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();

type TabRouterProps = {
  firstTab: {
    name: string;
    component: React.ComponentType<any>;
  };
  secondTab: {
    name: string;
    component: React.ComponentType<any>;
  };
};

const TabRouter = ({
  firstTab,
  secondTab,
}: TabRouterProps) => {
  return (
    <Tab.Navigator
      initialRouteName={firstTab.name}
      tabBarOptions={{
        activeTintColor: '#0E76FF',
        labelStyle: {
          fontSize: Theme._HEIGHT / 48,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
      }}>
      <Tab.Screen
        name={firstTab.name}
        component={firstTab.component}
      />
      <Tab.Screen
        name={secondTab.name}
        component={secondTab.component}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
