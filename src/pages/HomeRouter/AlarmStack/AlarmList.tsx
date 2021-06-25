/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from '~/components/atoms/Container';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';
import {AlarmListDummy} from '~/lib/dummyData/DummyData';
import {List} from '@ui-kitten/components';
import NormalListItem from '~/components/molecules/ListItem';
import {MenuText} from '~/components/atoms/Text';

type AlarmListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const setRead = (item: any) => {
  //TODO: 서버 보내고, falst -> true
  console.log(`서버에 읽었다 보낼 아이템 `);
  console.log(JSON.stringify(item));
};

const removeAllAlrams = () => {
  //TODO: 서버에서 유저의 모든 알람 삭제
  console.log(`서버에서 유저 모든 알람 삭제`);
};

const removeReadAlrams = () => {
  //TODO: 서버에서 유저가 읽은 알람 삭제
  console.log(`서버에서 유저가 읽은 알람 삭제`);
};

const AlarmList = ({navigation}: AlarmListProps) => {
  return (
    <DownKeyboard>
      <Container style={styles.container}>
        {AlarmListDummy.length > 0 ? (
          <>
            <View style={styles.alarmView}>
              <MenuText
                size={'12px'}
                color={Theme.color.gray}
                onPress={() => removeAllAlrams()}>
                {'알림 모두 삭제'}
              </MenuText>
              <MenuText size={'11px'} color={Theme.color.gray} children={'   |   '} />
              <MenuText
                size={'12px'}
                color={Theme.color.gray}
                onPress={() => removeReadAlrams()}>
                {'읽은 알림 삭제'}
              </MenuText>
            </View>
            <List
              style={styles.list}
              data={AlarmListDummy}
              //랜더 아이템을 함수형으로 쓰면 안됨. Invalid hook call에 걸림
              // Hooks can only be called inside of the body of a function component.
              // This could happen for one of the following reasons:
              // renderItem={({item}: any) =>
              //   PatientListItem(item, setModalVisible)
              // }
              renderItem={({item}: any) => (
                <NormalListItem item={item} setRead={setRead} />
              )}
              scrollEnabled={true}
            />
          </>
        ) : (
          <View style={styles.emptyTextView}>
            <MenuText style={{alignItems: 'center'}} color={Theme.color.gray}>
              받은 알림이 없습니다.
            </MenuText>
          </View>
        )}
      </Container>
    </DownKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    // borderWidth: 1,
  },
  alarmView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 7,
    marginBottom: 7,
    marginRight: 35,
    // borderWidth: 1,
  },
  list: {
    // marginTop: 30,
    // borderWidth: 1,
    backgroundColor: 'white',
    maxHeight: 438,
    width: '100%',
  },
  Icon: {
    marginTop: -20,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
  },
  emptyTextView: {
    height: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
  },
});

export default AlarmList;
