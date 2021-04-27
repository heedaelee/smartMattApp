/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeRouter = () => {
  console.log('홈라우터 랜더링');
  return (
    <Stack.Navigator >
      {/*       <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FinderID" component={FinderID} />
      <Stack.Screen name="FinderPW" component={FinderPW} />
      <Stack.Screen name="Bluetooth" component={Bluetooth} />
      <Stack.Screen name="MainRouter" component={MainRouter} /> */}
    </Stack.Navigator>
  );
};

export default HomeRouter;
