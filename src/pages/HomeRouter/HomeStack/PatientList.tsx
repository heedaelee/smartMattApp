/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Card,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import PatientListItem, {
  PatientListItemProps,
} from '~/components/molecules/PatientListItem';
import {PatientListDummy} from '~/lib/dummyData/DummyData';

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const PatientList = ({navigation}: PatientListProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const goToAddPatientPage = () => {
    navigation.navigate('PatientEditor', {
      screen: '환자 추가',
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container}>
        <List
          style={styles.list}
          data={PatientListDummy}
          renderItem={(item: any) =>
            PatientListItem(item, setModalVisible)
          }
          scrollEnabled={true}
        />
        <CircleButton onPress={goToAddPatientPage}>
          +
        </CircleButton>
        <Modal
          visible={modalVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setModalVisible(false)}>
          <Card disabled={true}>
            <Text>Welcome to UI Kitten 😻</Text>
            <Button onPress={() => setModalVisible(false)}>
              DISMISS
            </Button>
          </Card>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PatientList;
