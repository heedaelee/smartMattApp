/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PatientListTemplate from '~/components/templates/HomeRouter/HomeStack/PatientListTemplate';
import HeatMapTemplate from '~/components/templates/HomeRouter/HomeStack/HeatMapTemplate';
import Theme from '~/lib/Theme';
const Tab = createMaterialTopTabNavigator();

type TabsProps = {
  firstTabName: string;
  secondTabName: string;
};

const Tabs = ({firstTabName, secondTabName}: TabsProps) => {
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
        component={PatientListTemplate}
      />
      <Tab.Screen
        name={secondTabName}
        component={HeatMapTemplate}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
