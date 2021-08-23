/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import Axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import NormalListItem from '~/components/molecules/ListItem';
import MenuModal from '~/components/organisms/modal/MenuModal';
import RemoveModal from '~/components/organisms/modal/RemoveModal';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import {useLoggedUser, useSelectedPatient} from '~/hooks/useReduce';
import {Device, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';
//import mqtt from '@taoqf/react-native-mqtt';
let mqtt = require('@taoqf/react-native-mqtt');

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: any;
};

const PatientList = ({navigation, route}: PatientListProps) => {
  const [menuModalVisible, setMenuModalVisible] = useBoolean(false);
  const [removeModalVisible, setRemoveModalVisible] = useBoolean(false);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  // const [patientList, setPatientList] = useInput([]);
  // const [pageNum, setPageNum] = useInput(1);
  const [state, setState] = useState({data: [], page: 1, refreshing: false});
  const [userState, setUserReducer] = useLoggedUser();

  console.log('PatientList 랜더링');

  //환자 리스트 갖고옴, mount시
  useEffect(() => {
    // console.log(`useEffect 랜더링, pageNum : ${pageNum}`);
    console.log(`useEffect 랜더링, pageNum : ${state.page}`);
    getPatientList();
  }, []);

  //환자 리스트 갖고옴, refreshing 버튼 작동시(유저 하단 드래그시)
  useEffect(() => {
    console.log(`state.refreshing 호출useEffect ${JSON.stringify(state)}`);
    if (state.refreshing) {
      console.log(`state.refreshing 호출useEffect & state.refreshing === true 일때`);
      getPatientList();
    }
  }, [state.refreshing]);

  //문제 : refresh시 여러번 getPatientList()가 호출되는게 문제.
  // useEffect(() => {
  //   console.log(`state refresing 값 변할때만 Call`);
  //   getPatientList();
  //   // if (timer) {
  //   //   console.log('clear timer');
  //   //   clearTimeout(timer);
  //   // }
  //   // const newTimer = setTimeout(async () => {
  //   //   try {
  //   //     await getPatientList();
  //   //   } catch (e) {
  //   //     console.error('error', e);
  //   //   }
  //   // }, 800);
  //   // setTimer(newTimer);

  // }, [state.refreshing]);

  const goToAddPatientPage = () => {
    navigation.navigate('AddDevice', {
      screen: '기기 추가',
    });
  };

  /* 접속
  TODO: MQTT 커넥션 부분 셋팅
  */
  const goToSensorPage = () => {
    console.log('goToSensorPage 함수');
    setMenuModalVisible(false);
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'HomeTabRouter', params: {screen: '실시간 센서'}}],
    // });

    // navigation.reset({
    //   index: 0,
    //   routes: [{name: '실시간 센서'}],
    // });

    // navigation.jumpTo('실시간 센서');

    // console.log('**navigation');
    // console.dir(route);

    navigation.navigate('HomeTabRouter', {
      screen: '실시간 센서',
    });

    // const MQTT_ADDR = 'ws://192.168.138.19';
    // 포트를 adb -s R3CMB08119P reverse tcp:8080 tcp:8080 로 변화하면 localhost도 통신 가능하다
    // 유의할 건 같은 네트워크 IP주소여야 함.
    // const MQTT_ADDR = 'ws://localhost';

    // const mqtt_port = 8080;
    // function mqttConnect() {
    //   console.log(`mqtt연결 시도`);
    //   let option = {
    //     port: mqtt_port,
    //     keepalive: 0,
    //   };
    //   let client = mqtt.connect(MQTT_ADDR, option);

    //   console.dir(client);

    //   client.on('connect', () => {
    //     console.log('MQTT connect');
    //     // let topic = channel + '/status';
    //     let topic = '123456';
    //     client.subscribe(topic);
    //   });

    //   client.on('error', (err: string) => {
    //     console.log(`소켓 접속 에러 : ${err}`);
    //   });

    //   client.on('message', function (topic: any, message: any) {
    //     // message is Buffer
    //     /* byte방식 */
    //     console.log(`${message.toString()}`);
    //   });
    //   return client;
    // }

    // mqttConnect();
  };

  /* 편집 삭제 일단 보류*/
  const goToEditPatientPage = () => {
    console.log('goToEditPatientPage 함수');
    setMenuModalVisible(false);
    navigation.navigate('PatientEditor', {
      screen: '환자 수정',
    });
  };

  /* 편집 삭제 일단 보류*/
  const onPressRemoveButton = () => {
    setMenuModalVisible(false);
    setRemoveModalVisible(true);
  };

  /* 삭제 */
  const deletePatient = () => {
    console.log(`deletePatient 함수 보낼 data : ${selectedPatientState}`);
    setRemoveModalVisible(false);
    Toast.show('삭제되었습니다');
    //TODO: 삭제 프로세스 redux 던지기
  };

  const handleRefresh = () => {
    setState({data: [], page: 1, refreshing: true});
    console.log(`handleRefresh호출 ${JSON.stringify(state)}`);
    // getPatientList();
  };

  const getPatientList = async () => {
    console.log('getPatinetList call');
    const {id} = userState;
    console.log(id);

    //pageNum을 offeset으로 변형
    //0,8,16.. 0 + 8(n-1) 으로 DB의 OFFSET이 들어가야함
    //OFFSET = 0,8,16 ... = 0 + (8 * (pageNum - 1))
    //const offset = 0 + 8 * (pageNum - 1);
    const offset = 0 + 8 * (state.page - 1);
    console.log(`offset 값 : ${offset}`);
    console.log(`state.page 값 : ${state.page}`);

    const postData = JSON.stringify({id: id, offset: offset});

    await Axios.post(NODE_API + Device.GET_PATIENT_LIST_API, postData, jsonHeader)
      .then(res => {
        console.log('res.data 받음', JSON.stringify(res.data));
        const {success, message, list} = res.data;
        if (success) {
          console.log('list select 성공');
          console.log(`getPatientList 내의 state: ${JSON.stringify(state)}`);
          setState({
            data: state.refreshing ? list : state.data.concat(list),
            page: state.page + 1,
            refreshing: false,
          });
        } else {
          console.log('getPatientList server api success:false');
          switch (message) {
            case 'db error':
              Alert.alert('db error');
              break;
            case '디바이스 없음':
              Alert.alert('다비아스 코드가 없습니다.');
              break;
            case '환자 이미 존재':
              Alert.alert('이미 추가된 디바이스코드 입니다.');
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
              <NormalListItem item={item} setModalVisible={setMenuModalVisible} />
            )}
            scrollEnabled={true}
            onEndReached={getPatientList}
            onEndReachedThreshold={0.01}
            refreshing={state.refreshing}
            onRefresh={handleRefresh}
          />
        ) : (
          <View style={styles.emptyTextView}>
            <MenuText style={{alignItems: 'center'}} color={Theme.color.gray}>
              등록된 환자가 없습니다
            </MenuText>
          </View>
        )}
        {/* <View style={styles.circleButtonRow}> */}
        <CircleButton onPress={goToAddPatientPage}>+</CircleButton>
        {/* </View> */}
        <MenuModal
          menuModalVisible={menuModalVisible}
          setMenuModalVisible={setMenuModalVisible}
          goToSensorPage={goToSensorPage}
          goToEditPatientPage={goToEditPatientPage}
          onPressRemoveButton={onPressRemoveButton}
        />
        <RemoveModal
          modalVisible={removeModalVisible}
          setModalVisible={setRemoveModalVisible}
          deletePatient={deletePatient}
        />
      </Container>
    </DownKeyboard>
  );
};

/* border: 1px;
  border-color: gray; */

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginBottom: 30,
    // backgroundColor: 'black',
  },
  list: {
    // borderWidth: 1,
    maxHeight: 530,
    width: '100%',
    backgroundColor: 'white',
  },
  listItem: {
    borderWidth: 1,
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
  circleButtonRow: {
    borderWidth: 1,
  },
});

export default PatientList;
