/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import DownKeyboard from '~/lib/DownKeyboard';
import {Icon, Divider} from '@ui-kitten/components';
import Theme from '~/lib/Theme';

type MypageListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: RouteProp<HomeStackNaviParamList, any>;
};

const onPressItem = () => {
  console.log('onPressItem 클릭');
};

const MypageList = ({navigation, route}: MypageListProps) => {
  return (
    <DownKeyboard>
      <Container style={styles.container}>
        <TouchableHighlight
          style={styles.toucable}
          underlayColor="#f2f1f1dd"
          activeOpacity={0.3}
          onPress={onPressItem}>
          <View style={styles.oneMenuView}>
            <MenuText color={Theme.color.gray}>내 프로필</MenuText>
            <Icon
              style={styles.icon}
              fill={Theme.color.gray}
              name="arrow-ios-forward-outline"
            />
          </View>
        </TouchableHighlight>
        <Divider style={styles.divider} />
      </Container>
    </DownKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,

    paddingBottom: '3%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  toucable: {
    flexDirection: 'row',
    // borderWidth:3,
  },
  oneMenuView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '9%',
    paddingRight: '9%',
    paddingBottom: 20,
    borderWidth: 1,
  },
  divider: {
    alignSelf: 'stretch',
  },

  icon: {
    width: 32,
    height: 32,
  },
});

export default MypageList;
