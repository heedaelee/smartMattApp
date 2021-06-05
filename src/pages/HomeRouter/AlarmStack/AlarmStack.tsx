/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Button, Text, StyleSheet} from 'react-native';
import Theme from '~/lib/Theme';
import TabRouter from '../TabRouter';
import IconAnt from 'react-native-vector-icons/AntDesign';
import AlarmList from './AlarmList';
import AlarmSetting from './AlarmSetting';

const Stack = createStackNavigator();

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const AlarmStack = ({}) => {
  const iconSize = Theme._WIDTH / 13;
  const iconColor = 'white';
  //TEST
  return (
    <Stack.Navigator
      initialRouteName="AlarmTabRouter"
      screenOptions={{
        headerStyle: {backgroundColor: Theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="AlaramTabRouter"
        options={({navigation, route}) => ({
          title: '알림',
          headerRight: () => (
            <IconAnt
              name="wifi"
              size={iconSize}
              color={iconColor}
              style={styles.HedaerIcon}
              onPress={() => {
                navigation.navigate('Bluetooth');
              }}
            />
          ),
        })}>
        {() => (
          //TODO: 탭 라우터 완성
          <TabRouter
            firstTab={{
              name: '알림목록',
              component: AlarmList,
            }}
            secondTab={{
              name: '알림셋팅',
              component: AlarmSetting,
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  HedaerIcon: {
    right: 20,
  },
});

export default AlarmStack;
