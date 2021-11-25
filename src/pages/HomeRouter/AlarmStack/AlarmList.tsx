/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Container} from '~/components/atoms/Container';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';
import {AlarmListDummy} from '~/lib/dummyData/DummyData';
import {List} from '@ui-kitten/components';
import NormalListItem from '~/components/molecules/ListItem';
import {MenuText} from '~/components/atoms/Text';
import {RouteProp} from '@react-navigation/native';
import {useLoggedUser} from '~/hooks/useReduce';
import Axios from 'axios';
import {Alarm, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import useBoolean from '~/hooks/useBoolean';
import AlarmListItem from '~/components/molecules/AlarmListItem';

type AlarmListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: RouteProp<HomeStackNaviParamList, any>;
};

/** 기능 : 유저의 alarm list 가져오기 from 서버 API
 * 작업일 : 11/25
 * out: data = {id, isRead = 1}
 * in: {success, message:success|db error|empty param }
 */
const setRead = async (item: any) => {
  //TODO: 서버 보내고, falst -> true
  console.log(`서버에 읽었다 보낼 아이템 `);
  console.log(JSON.stringify(item));
  item.isRead = 1;
  console.log(item.isRead);

  if (item.isRead === 0) {
    const postData = JSON.stringify({id: item.id, isRead: 1});
    await Axios.post(NODE_API + Alarm.UPDATE_ALARM_ISREAD_API, postData, jsonHeader)
      .then(res => {
        console.log(
          '**** [getAlarmList][Axios.post]res.data 받음',
          JSON.stringify(res.data),
        );
        const {success, message} = res.data;
        if (success) {

        } else {
          console.log('**** [getAlarmList][Axios.post] server api fail');
          switch (message) {
            case 'db error':
              Alert.alert(message);
              break;
            case 'empty params':
              Alert.alert(message);
              break;
            case 'empty data':
              break;
          }
        }
      })
      .catch(e => console.log(`에러 : ${JSON.stringify(e)}`));
  }
};

const removeAllAlrams = () => {
  //TODO: 서버에서 유저의 모든 알람 삭제
  console.log(`서버에서 유저 모든 알람 삭제`);
};

const removeReadAlrams = () => {
  //TODO: 서버에서 유저가 읽은 알람 삭제
  console.log(`서버에서 유저가 읽은 알람 삭제`);
};

const AlarmList = ({navigation, route}: AlarmListProps) => {
  const [userState, setUserReducer] = useLoggedUser();
  const [state, setState] = useState({data: [], page: 1, refreshing: false});
  //onEndReached duplicate call 문제땜에 call 한번만 부르기 위해 만든 flag
  const [finished, setFinished] = useBoolean(false);
  const [loading, setLoading] = useState(false);
  //환자 리스트 갖고옴, mount시
  useEffect(() => {
    console.log(`useEffect () 작동`);
    getAlarmList();
    return () => {
      console.log('AlarmList 언마운트');
    };
  }, []);

  /**
   * 기능 : 유저의 alarm list 가져오기 from 서버 API
   * 작업일 : 11/25
   * out: data = {id, offset}
   * in: {success:boolean, message:success|db error|empty data|empty param, list:[]}
   */
  const getAlarmList = async () => {
    console.log('**** [getAlarmList] 콜');
    const {id} = userState;
    const contentsCnt = 10;
    const offset = 0 + contentsCnt * (state.page - 1);
    // console.log(`offset 값 : ${offset}`);
    // console.log(`state.page 값 : ${state.page}`);

    const postData = JSON.stringify({id: id, offset: offset});
    setLoading(true);
    await Axios.post(NODE_API + Alarm.GET_ALARM_LIST_API, postData, jsonHeader)
      .then(res => {
        console.log(
          '**** [getAlarmList][Axios.post]res.data 받음',
          JSON.stringify(res.data),
        );
        const {success, message, list} = res.data;
        if (success) {
          console.log('**** [getAlarmList][Axios.post] server api success');
          // console.log(
          //   `**** [getAlarmList][Axios.post]api 호출 성공 후의 state 값: ${JSON.stringify(
          //     state,
          //   )}`,
          console.log(
            `**** [getAlarmList][Axios.post]api 호출 성공 후의 list 값: ${JSON.stringify(
              list,
            )}`,
          );
          setState({
            data: state.refreshing ? list : state.data.concat(list),
            page: state.page + 1,
            refreshing: false,
          });
          //아이템이 10개 안될경우 finsied flag를 true로 -> 무한스크롤 무한콜 방지
          if (list.length < contentsCnt) {
            console.log('====================================');
            console.log(`10개 안됨 : ${list.length}`);
            console.log('====================================');
            setFinished(true);
          }
        } else {
          console.log('**** [getAlarmList][Axios.post] server api fail');
          switch (message) {
            case 'db error':
              Alert.alert(message);
              break;
            case 'empty params':
              Alert.alert(message);
              break;
            case 'empty data':
              break;
          }
        }
      })
      .catch(e => console.log(`에러 : ${JSON.stringify(e)}`));
  };

  return (
    <DownKeyboard>
      <Container style={styles.container}>
        {state.data.length > 0 ? (
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
              data={state.data}
              //랜더 아이템을 함수형으로 쓰면 안됨. Invalid hook call에 걸림
              // Hooks can only be called inside of the body of a function component.
              // This could happen for one of the following reasons:
              // renderItem={({item}: any) =>
              //   PatientListItem(item, setModalVisible)
              // }
              renderItem={({item}: any) => (
                <AlarmListItem item={item} setRead={setRead} />
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
