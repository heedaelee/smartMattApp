/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import Axios from 'axios';
import React, {useEffect} from 'react';
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
import {PatientListDummy} from '~/lib/dummyData/DummyData';
import Theme from '~/lib/Theme';

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const PatientList = ({navigation}: PatientListProps) => {
  const [menuModalVisible, setMenuModalVisible] = useBoolean(false);
  const [removeModalVisible, setRemoveModalVisible] = useBoolean(false);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  const [patientList, setPatientList] = useInput([]);
  const [pageNum, setPageNum] = useInput(1);
  const [userState, setUserReducer] = useLoggedUser();

  useEffect(() => {
    getPatientList();
  }, []);

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
    navigation.navigate('HomeTabRouter', {
      screen: '실시간 센서',
    });
  };

  /* 편집 */
  const goToEditPatientPage = () => {
    console.log('goToEditPatientPage 함수');
    setMenuModalVisible(false);
    navigation.navigate('PatientEditor', {
      screen: '환자 수정',
    });
  };

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

  const getPatientList = async () => {
    const {id} = userState;
    console.log(id);

    //pageNum을 offeset으로 변형
    //0,8,16.. 0 + 8(n-1) 으로 DB의 OFFSET이 들어가야함
    //OFFSET = 0,8,16 ... = 0 + (8 * (pageNum - 1))
    const offset = 0 + 8 * (pageNum - 1);
    console.log(`offset 값 : ${offset}`);

    const postData = JSON.stringify({id: id, offset: offset});

    await Axios.post(NODE_API + Device.GET_PATIENT_LIST_API, postData, jsonHeader)
      .then(res => {
        console.log('res.data 받음', JSON.stringify(res.data));
        const {success, message, list} = res.data;
        if (success) {
          console.log('list select 성공');
          // this.setState({
          //   data: this.state.data.concat(data), // 기존 data에 추가.
          //   page: this.state.page + 1
          // })

          //자료는 concat으로 배열 뒤 붙이고, ++pageNum 해준다.
          setPatientList(patientList.concat(list));
          setPageNum(pageNum + 1);
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
        {PatientListDummy.length > 0 ? (
          <List
            style={styles.list}
            data={PatientListDummy}
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
