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
  route: RouteProp<HomeStackNaviParamList, any>;
};

const iconSize = Theme._WIDTH / 13;

//NOTE:리스너 만든 이유:
//bottom navigation 선택 전환시 이전 stack이 초기화가 안되서 내용이 남아 있음.
//그래서 탭 같은 경우 두번째 탭을 선택한 후 다른 하단네비 선택후에도 두번째 선택으로 남아 있기에 리스너에서
//각 하단 네비의 첫 탭 스크린으로 초기화 시켜주는 역할
const tabBarListeners = ({navigation, route}: BottomNaviRouterProps) => ({
  tabPress: () => {
    //navugatuib router 체크
    // console.log(navigation);
    // console.log(route);

    switch (route.name) {
      case 'HomeStack':
        navigation.navigate('HomeTabRouter', {screen: '환자 목록'});
        break;
      case 'AlarmStack':
        navigation.navigate('AlarmTabRouter', {screen: '알림 목록'});
        break;
    }
  },
});

const BottomNaviRouter = ({navigation, route}: BottomNaviRouterProps) => {
  return (
    <Tab.Navigator
      // FORTEST: initial : HomeStack -> MypageStack
      initialRouteName="MypageStack"
      // initialRouteName="PatientEditor"
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
        listeners={tabBarListeners}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={iconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AlarmStack"
        component={AlarmStack}
        listeners={tabBarListeners}
        options={{
          tabBarLabel: '알림',
          tabBarIcon: ({color, size}) => (
            <IconA name="alarm-light" size={iconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MypageStack"
        component={MyPageStack}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({color, size}) => (
            <IconU name="user" size={iconSize} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNaviRouter;
