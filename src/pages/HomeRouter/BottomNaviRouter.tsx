/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import useInput from '~/hooks/useInput';
import useBoolean from '~/hooks/useBoolean';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Theme from '~/lib/Theme';
import HomeStack from '~/pages/HomeRouter/HomeStack/HomeStack';
import AlarmStack from '~/pages/HomeRouter/AlarmStack/AlarmStack';
import MyPageStack from '~/pages/HomeRouter/MyPageStack/MyPageStack';
import Icon from 'react-native-vector-icons/Fontisto';
import IconU from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export type BottomNaviRouterProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  router: RouteProp<HomeStackNaviParamList, 'HomeStack'>;
};

const iconSize = Theme._WIDTH / 13;

const BottomNaviRouter = ({
  navigation,
  router,
}: BottomNaviRouterProps) => {
  return (
    <Tab.Navigator
      // FORTEST: initial : HomeStack -> addPatientList
      initialRouteName="HomeStack"
      // initialRouteName="AddPatient"
      tabBarOptions={{
        activeTintColor: '#0E76FF',
        tabStyle: {
          flex: 1,
          height: 70,
          bottom: 30,
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: Theme._HEIGHT / 50,
          fontFamily: 'SpoqaHanSansNeo-Medium',
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="home"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AlarmStack"
        component={AlarmStack}
        options={{
          tabBarLabel: '알림',
          tabBarIcon: ({color, size}) => (
            <IconA
              name="alarm-light"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({color, size}) => (
            <IconU
              name="user"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNaviRouter;
