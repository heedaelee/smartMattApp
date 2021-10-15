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
import HomeTabRouter from '../HomeTabRouter';
import PatientEditor from './PatientEditor';
import AddDevice from './AddDevice';

// export type SignInProps = {
//   navigation: StackNavigationProp<any, 'SignIn'>;
// };

const Stack = createStackNavigator();

const HomeStack = () => {
  console.log('홈 stack 호출');
  const iconSize = Theme._WIDTH / 13;
  const iconColor = 'white';
  //TEST LogOut
  // const {logout} = useContext(UserContext);
  return (
    // <Button title={'logout'} onPress={() => logout()} />
    // FORTEST:
    <Stack.Navigator
      // initialRouteName="실시간 센서"
      screenOptions={{
        headerStyle: {backgroundColor: Theme.color.blue},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: Theme._HEIGHT / 40,
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
                // console.log(navigation)
                //console.log(JSON.stringify(navigation));
                navigation.navigate('Bluetooth');
              }}
            />
          ),
        })}
        component={HomeTabRouter}
      />
      {/* 탭을 자식처럼 쓰는 방법에서 component로 변경, 
        tabRouter도 공통모듈로 만들었다가 걍 HomeTabRouter 따로 만듬. option도 주고, 뭔가
        Tab 같은건 다른 레퍼런스도 공통모듈로 안만들고 해서 찝찝해서..
        */}
      {/* {() => (
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
        )} */}
      {/* </Stack.Screen> */}
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
