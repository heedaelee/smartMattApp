/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Bluetooth from '~/pages/HomeRouter/Bluetooth';
import BottomNaviRouter from '~/pages/HomeRouter/BottomNaviRouter';
import theme from '../lib/Theme';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Theme from '../lib/Theme';
import {StyleSheet} from 'react-native';
import AddPatient from '~/pages/HomeRouter/HomeStack/AddPatient';

const Stack = createStackNavigator<HomeStackNaviParamList>();

const HomeRouter = () => {
  console.log('홈라우터 랜더링');
  const iconSize = Theme._WIDTH / 13;
  const iconColor = 'white';

  return (
    <Stack.Navigator
      // FORTEST: 개발시 initial 임시 조정 : BottomNaviRouter로
      initialRouteName="BottomNaviRouter"
      screenOptions={{
        headerStyle: {backgroundColor: theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Bluetooth"
        component={Bluetooth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomNaviRouter"
        // Origin:
        // options={({route}: any) => ({
        //   title: route.params.screen,
        // })}
        // FORTEST:
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
        })}
        component={BottomNaviRouter}
      />
      <Stack.Screen
        name="AddPatient"
        options={{title:'환자 추가'}}
        component={AddPatient}
      />
      {/*<Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="FinderID" component={FinderID} />
      <Stack.Screen name="FinderPW" component={FinderPW} />
      <Stack.Screen name="Bluetooth" component={Bluetooth} />
       */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  HedaerIcon: {
    right: 20,
  },
});

export default HomeRouter;
