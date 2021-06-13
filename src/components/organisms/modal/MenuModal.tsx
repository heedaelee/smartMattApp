/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Button, Card, Modal} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MenuText} from '~/components/atoms/Text';
import ModalOneMenuRow from '~/components/molecules/ModalOneMenuRow';
import {useSelectedPatient} from '~/hooks/useReduce';

type MenuModalProps = {
  modalVisible: boolean;
  setModalVisible: (active: boolean) => void;
  goToSensorPage: () => void;
  goToEditPatientPage: () => void;
  deletePatient: () => void;
};

const MenuModal = ({
  modalVisible,
  setModalVisible,
  goToSensorPage,
  goToEditPatientPage,
  deletePatient,
}: MenuModalProps) => {
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisible(false)}>
      <Card disabled={true} style={styles.cardStyle}>
        <View style={styles.modalNameRow}>
          <MenuText size={'18px'}>{selectedPatientState.name}</MenuText>
        </View>
        <ModalOneMenuRow onPress={goToSensorPage}>접속</ModalOneMenuRow>
        <ModalOneMenuRow onPress={goToEditPatientPage}>편집</ModalOneMenuRow>
        <ModalOneMenuRow textColor={'red'} onPress={deletePatient}>
          삭제
        </ModalOneMenuRow>
        <View style={styles.modalButtonRow}>
          <Button size="small" onPress={() => setModalVisible(false)}>
            닫기
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardStyle: {
    width: 180,
    flexDirection: 'column',
    // borderWidth: 4,
    // borderColor: 'red',
  },
  modalNameRow: {
    // borderWidth: 1,
    marginBottom: 25,
  },
  ModalMenuRow: {
    flexDirection: 'row',
    // borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  modalButtonRow: {
    marginTop: 10,
  },
});

export default MenuModal;
