/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Button, Text, StyleSheet} from 'react-native';
import Theme from '~/lib/Theme';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {StyleService} from '@ui-kitten/components';
import MypageList from './MypageList';

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const Stack = createStackNavigator();

const MyPageStack = ({}) => {
  const iconSize = Theme._WIDTH / 13;
  const iconColor = 'white';

  return (
    <Stack.Navigator
      initialRouteName="MypageList"
      screenOptions={{
        headerStyle: {backgroundColor: Theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MypageList"
        component={MypageList}
        options={({navigation, route}) => ({
          title: '마이페이지',
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
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  HedaerIcon: {
    right: 20,
  },
});

export default MyPageStack;
