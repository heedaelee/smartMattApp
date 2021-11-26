/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {Container} from '~/components/atoms/Container';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';
import {List} from '@ui-kitten/components';
import {MenuText} from '~/components/atoms/Text';
import {RouteProp} from '@react-navigation/native';
import {useLoggedUser} from '~/hooks/useReduce';
import Axios from 'axios';
import {Alarm, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import useBoolean from '~/hooks/useBoolean';
import AlarmListItem from '~/components/molecules/AlarmListItem';
import Toast from 'react-native-simple-toast';

type AlarmListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: RouteProp<HomeStackNaviParamList, any>;
};

const AlarmList = ({navigation, route}: AlarmListProps) => {
  const [userState, setUserReducer] = useLoggedUser();
  const [state, setState] = useState({data: [], page: 1, refreshing: false});
  //onEndReached duplicate call 문제땜에 call 한번만 부르기 위해 만든 flag
  const [finished, setFinished] = useBoolean(false);
  const [loading, setLoading] = useState(false);
  // const [refreshToggle, setRefreshToggle] = useState(false);
  //환자 리스트 갖고옴, mount시
  useEffect(() => {
    console.log(`useEffect () 작동`);
    getAlarmList();
    return () => {
      console.log('AlarmList 언마운트');
    };
  }, []);

  //환자 리스트 갖고옴, refreshing 버튼 작동시(유저 새로고침을 위해 밑으로 drag시)
  useEffect(() => {
    console.log(`second useEffect refreshing ${JSON.stringify(state)}`);
    if (state.refreshing) {
      console.log(`state.refreshing 호출useEffect & state.refreshing === true 일때`);
      getAlarmList();
    }
  }, [state.refreshing]);

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
    setLoading(false);
  };

  /** 기능 : 클릭시 알람 아이템 읽음 표시
   * 작업일 : 11/25
   * out: data = {id, isRead = 1}
   * in: {success, message:success|db error|empty param }
   */
  const setRead = async (item: any) => {
    //TODO: 서버 보내고, falst -> true
    console.log(`서버에 읽었다 보낼 아이템 `);
    console.log(JSON.stringify(item));
    console.log(item.isRead);

    if (item.isRead === 0) {
      const postData = JSON.stringify({id: item.id, isRead: 1});
      await Axios.post(NODE_API + Alarm.UPDATE_ALARM_ISREAD_API, postData, jsonHeader)
        .then(res => {
          console.log(
            '**** [AlarmList/setRead][Axios.post]res.data 받음',
            JSON.stringify(res.data),
          );
          const {success, message} = res.data;
          if (success) {
            console.log('**** [getAlarmList][Axios.post] server api success');

            // getAlarmList(1);
            setState({data: [], page: 1, refreshing: true});
            // setRefreshToggle(!refreshToggle);
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
  /** 기능 : 알람 삭제 / 모두 or 읽은 것
   * 작업일 : 11/26
   * out: data = {id, range: 'all' | 'read' }
   * in: {success, message:success|db error|empty param }
   */
  const removeAlrams = async (param: 'all' | 'read') => {
    console.log(`removeAlarms() 콜`);
    const {id} = userState;
    const postData = JSON.stringify({id: id, range: param});

    await Axios.post(NODE_API + Alarm.DELETE_ALARM_API, postData, jsonHeader).then(
      res => {
        console.log('[removeAlarms]res.data 받음', JSON.stringify(res.data));
        const {success, message} = res.data;
        if (success) {
          //refresh
          setState({data: [], page: 1, refreshing: true});
          let log = '',
            msg = '';
          if (param === 'all') {
            log = '데이터 모두 삭제 성공';
            msg = '모든 알림이 삭제되었습니다';
          } else if (param === 'read') {
            log = '데이터 읽은 삭제 성공';
            msg = '읽은 알림이 삭제되었습니다';
          }
          console.log(log);
          Toast.show(msg);
        } else {
          console.log('[removeAlarms] server api success:false');
          message && Alert.alert(message);
        }
      },
    );
  };

  const handleRefresh = () => {
    setState({data: [], page: 1, refreshing: true});
    setFinished(false);
    console.log(`handleRefresh호출 ${JSON.stringify(state)}`);
    // getPatientList();
  };

  return (
    <DownKeyboard>
      <Container style={styles.container}>
        {loading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator color="#0000ff" size={'large'} />
          </View>
        ) : state.data.length > 0 ? (
          <>
            <View style={styles.alarmView}>
              <MenuText
                size={'12px'}
                color={Theme.color.gray}
                onPress={() => {
                  state.data.length > 0 && removeAlrams('all');
                }}>
                {'알림 모두 삭제'}
              </MenuText>
              <MenuText size={'11px'} color={Theme.color.gray} children={'   |   '} />
              <MenuText
                size={'12px'}
                color={Theme.color.gray}
                onPress={() => {
                  state.data.length > 0 && removeAlrams('read');
                }}>
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
              onEndReached={finished === true ? null : getAlarmList}
              onEndReachedThreshold={0.01}
              keyExtractor={(item: any) => item.id.toString()}
              refreshing={state.refreshing}
              onRefresh={handleRefresh}
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
  horizontal: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AlarmList;
