/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import NormalListItem from '~/components/molecules/ListItem';
import MenuModal from '~/components/organisms/modal/MenuModal';
import RemoveModal from '~/components/organisms/modal/RemoveModal';
import useBoolean from '~/hooks/useBoolean';
import {useLoggedUser, useSelectedPatient} from '~/hooks/useReduce';
import {Device, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';
//import mqtt from '@taoqf/react-native-mqtt';

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: any;
};

const PatientList = ({navigation, route}: PatientListProps) => {
  const [menuModalVisible, setMenuModalVisible] = useBoolean(false);
  const [removeModalVisible, setRemoveModalVisible] = useBoolean(false);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  const [state, setState] = useState({data: [], page: 1, refreshing: false});
  const [userState, setUserReducer] = useLoggedUser();
  const [loading, setLoading] = useState(false);

  console.log('PatientList 랜더링');
  console.log(`loading : ${loading}`);

  //환자 리스트 갖고옴, mount시
  useEffect(() => {
    // console.log(`useEffect 랜더링, pageNum : ${pageNum}`);
    console.log(`first useEffect 랜더링, pageNum : ${state.page}`);
    getPatientList();
    return () => {
      console.log('==언마우늩?');
    };
  }, []);

  //환자 리스트 갖고옴, refreshing 버튼 작동시(유저 새로고침을 위해 밑으로 drag시)
  useEffect(() => {
    console.log(`second useEffect refreshing ${JSON.stringify(state)}`);
    if (state.refreshing) {
      console.log(`state.refreshing 호출useEffect & state.refreshing === true 일때`);
      getPatientList();
    }
  }, [state.refreshing]);

  const goToAddPatientPage = () => {
    navigation.navigate('AddDevice', {
      screen: '기기 추가',
    });
  };
  const goToSensorPage = () => {
    console.log('goToSensorPage 함수');
    setMenuModalVisible(false);

    navigation.navigate('HomeTabRouter', {
      screen: '실시간 센서',
    });
  };

  const goToEditPatientPage = () => {
    console.log('goToEditPatientPage 함수');
    setMenuModalVisible(false);
    navigation.navigate('PatientEditor', {
      screen: '환자 수정',
      deviceCode: selectedPatientState.deviceCode,
    });
  };

  /* 편집 삭제 일단 보류*/
  const onPressRemoveButton = () => {
    setMenuModalVisible(false);
    setRemoveModalVisible(true);
  };

  /* 삭제 */
  const deletePatient = async () => {
    console.log(`deletePatient 함수 보낼 data : ${selectedPatientState}`);
    console.dir(selectedPatientState);
    const postData = JSON.stringify({
      caregiver_id: userState.id,
      patient_id: selectedPatientState.id,
    });

    await Axios.post(NODE_API + Device.DELETE_PATIENT_API, postData, jsonHeader)
      .then(res => {
        console.log('res.data 받음', JSON.stringify(res.data));
        const {success, message} = res.data;
        if (success) {
          console.log('데이터 삭제 성공');
          setRemoveModalVisible(false);
          handleRefresh();
          Toast.show('삭제되었습니다');
        } else {
          console.log('deletePatient server api success:false');
          switch (message) {
            case 'db error':
              Alert.alert('db error');
              break;
            case 'empty params':
              Alert.alert('전달값 에러');
              break;
          }
        }
      })
      .catch(e => console.log(`에러 : ${JSON.stringify(e)}`));
  };

  const handleRefresh = () => {
    setState({data: [], page: 1, refreshing: true});
    console.log(`handleRefresh호출 ${JSON.stringify(state)}`);
    // getPatientList();
  };

  const getPatientList = async () => {
    console.log('[getPatinetList] call');
    const {id} = userState;
    // console.log(userState);

    //pageNum을 offeset으로 변형
    //0,8,16.. 0 + 8(n-1) 으로 DB의 OFFSET이 들어가야함
    //OFFSET = 0,8,16 ... = 0 + (8 * (pageNum - 1))
    //const offset = 0 + 8 * (pageNum - 1);
    const offset = 0 + 8 * (state.page - 1);
    // console.log(`offset 값 : ${offset}`);
    // console.log(`state.page 값 : ${state.page}`);

    const postData = JSON.stringify({id: id, offset: offset});

    // setLoading(true);
    await Axios.post(NODE_API + Device.GET_PATIENT_LIST_API, postData, jsonHeader)
      .then(res => {
        console.log(
          '[getPatinetList][Axios.post]res.data 받음',
          JSON.stringify(res.data),
        );
        const {success, message, list} = res.data;
        if (success) {
          console.log(
            `[getPatinetList][Axios.post]getPatientList 내의 state: ${JSON.stringify(
              state,
            )}`,
          );
          setState({
            data: state.refreshing ? list : state.data.concat(list),
            page: state.page + 1,
            refreshing: false,
          });
        } else {
          console.log(
            '[getPatinetList][Axios.post] getPatientList server api success:false',
          );
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
          console.log('test');
        }
      })
      .catch(e => console.log(`에러 : ${JSON.stringify(e)}`));
    // setLoading(false);
  };

  const spiner = (
    <View style={styles.horizontal}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <DownKeyboard>
      <Container style={styles.container}>
        {loading ? (
          <View style={styles.horizontal}>
            <ActivityIndicator color="#0000ff" size={'large'} />
          </View>
        ) : state.data.length > 0 ? (
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
            // onEndReached={state.data.length < 9 ? null : getPatientList}
            onEndReached={getPatientList}
            onEndReachedThreshold={0.01}
            refreshing={state.refreshing}
            onRefresh={handleRefresh}
          />
        ) : (
          <View style={styles.emptyTextView}>
            <MenuText style={{alignItems: 'center'}} color={Theme.color.gray}>
              등록된 환자가 없습니다 {console.log('==환자 view== ')}
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
    // maxHeight: 530,
    maxHeight: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  listItem: {
    // borderWidth: 1,
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
  horizontal: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default PatientList;
