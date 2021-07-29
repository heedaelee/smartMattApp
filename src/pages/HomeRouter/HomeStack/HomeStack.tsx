/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Theme from '~/lib/Theme';
import HeatMap from '~/pages/HomeRouter/HomeStack/HeatMap';
import PatientList from '~/pages/HomeRouter/HomeStack/PatientList';
import TabRouter from '../TabRouter';
import PatientEditor from './PatientEditor';
import AddDevice from './AddDevice';

import AlarmSetting from '../AlarmStack/AlarmSetting';

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const Stack = createStackNavigator();

const HomeStack = () => {
  const iconSize = Theme._WIDTH / 13;
  const iconColor = 'white';
  //TEST LogOut
  // const {logout} = useContext(UserContext);
  return (
    // <Button title={'logout'} onPress={() => logout()} />
    <Stack.Navigator
      initialRouteName="PatientList"
      screenOptions={{
        headerStyle: {backgroundColor: Theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HomeTabRouter"
        options={({navigation, route}) => ({
          title: '홈',
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
          <TabRouter
            firstTab={{
              name: '환자 목록',
              component: PatientList,
            }}
            secondTab={{
              name: '실시간 센서',
              //component: PatientList,
              component: HeatMap,
            }}
          />
        )}
        {/* secondTab={{
              name: '실시간 센서',
              component: HeatMap,
            }} */}
      </Stack.Screen>
      <Stack.Screen
        name="PatientEditor"
        options={({route}: any) => ({
          title: route.params.screen,
        })}
        component={PatientEditor}
      />
      <Stack.Screen
        name="AddDevice"
        options={({route}: any) => ({
          // title: route.params.screen,
          title: '기기 추가',
        })}
        component={AddDevice}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  HedaerIcon: {
    right: 20,
  },
});

export default HomeStack;
