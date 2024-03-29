/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Theme from '~/lib/Theme';

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

const TabRouter = ({firstTab, secondTab}: TabRouterProps) => {
  console.log('탭라우터 호출')
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0E76FF',
        labelStyle: {
          fontSize: Theme._HEIGHT / 48,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
      }}>
      <Tab.Screen name={firstTab.name} component={firstTab.component} />
      <Tab.Screen name={secondTab.name} component={secondTab.component} />
    </Tab.Navigator>
  );
};

export default TabRouter;
