/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import PatientListItem from '~/components/molecules/PatientListItem';
import MenuModal from '~/components/organisms/modal/MenuModal';
import DownKeyboard from '~/lib/DownKeyboard';
import {PatientListDummy} from '~/lib/dummyData/DummyData';
import {RootState} from '~/modules';

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const PatientList = ({navigation}: PatientListProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const testState = useSelector((state: RootState) => state.selectedPatient);
  console.log(testState.name);

  const goToAddPatientPage = () => {
    navigation.navigate('PatientEditor', {
      screen: '환자 추가',
    });
  };

  /* 접속
  TODO: MQTT 커넥션 부분 셋팅
  */
  const goToSensorPage = () => {
    console.log('goToSensorPage 함수');
    setModalVisible(false);
    navigation.navigate('HomeTabRouter', {
      screen: '실시간 센서',
    });
  };

  /* 편집 */
  const goToEditPatientPage = () => {
    console.log('goToEditPatientPage 함수');
    setModalVisible(false);
    navigation.navigate('PatientEditor', {
      screen: '환자 수정',
    });
  };

  /* 삭제 */
  const deletePatient = () => {
    console.log('deletePatient 함수');
    //TODO: 삭제 프로세스 redux 던지기
  };

  return (
    <DownKeyboard>
      <Container style={styles.container}>
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
            <PatientListItem item={item} setModalVisible={setModalVisible} />
          )}
          scrollEnabled={true}
        />
        <CircleButton onPress={goToAddPatientPage}>+</CircleButton>
        <MenuModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          goToSensorPage={goToSensorPage}
          goToEditPatientPage={goToEditPatientPage}
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
    marginBottom: 30,
  },
  list: {
    // borderWidth: 1,
    maxHeight: 438,
    width: '100%',
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
});

export default PatientList;
