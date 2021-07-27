/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import NormalListItem from '~/components/molecules/ListItem';
import MenuModal from '~/components/organisms/modal/MenuModal';
import RemoveModal from '~/components/organisms/modal/RemoveModal';
import useBoolean from '~/hooks/useBoolean';
import {useSelectedPatient} from '~/hooks/useReduce';
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
