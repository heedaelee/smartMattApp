/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '~/pages/HomeRouter/Home';
import theme from '../lib/Theme';
import Bluetooth from '~/pages/HomeRouter/Bluetooth';

const Stack = createStackNavigator();

const HomeRouter = () => {
  console.log('홈라우터 랜더링');
  return (
    <Stack.Navigator
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
      {/*<Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="FinderID" component={FinderID} />
      <Stack.Screen name="FinderPW" component={FinderPW} />
      <Stack.Screen name="Bluetooth" component={Bluetooth} />
      <Stack.Screen name="MainRouter" component={MainRouter} /> */}
    </Stack.Navigator>
  );
};

export default HomeRouter;
