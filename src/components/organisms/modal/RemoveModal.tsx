/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Button, Card, Modal} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MenuText} from '~/components/atoms/Text';


type RemoveModalProps = {
  modalVisible: boolean;
  setModalVisible: (active: boolean) => void;
  deletePatient: () => void;
};

const RemoveModal = ({
  modalVisible,
  setModalVisible,
  deletePatient,
}: RemoveModalProps) => {
  // console.log(`modalvisible : ${modalVisible}`);
  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisible(false)}>
      <Card disabled={true} style={styles.cardStyle}>
        <View style={styles.modalTitleRow}>
          <MenuText size={'18px'}>프로필 삭제</MenuText>
        </View>
        <View style={styles.modalMsgRow}>
          <MenuText size={'16px'}>정말 삭제 하시겠습니까?</MenuText>
        </View>
        <View style={styles.modalButtonRow}>
          <Button
            style={styles.button}
            size="small"
            onPress={() => setModalVisible(false)}>
            취소
          </Button>
          <Button
            style={styles.button}
            size="small"
            appearance={'outline'}
            onPress={() => deletePatient()}>
            삭제
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
    width: 240,
    flexDirection: 'column',
    // borderWidth: 4,
    // borderColor: 'red',
  },
  modalTitleRow: {
    // borderWidth: 1,
    marginBottom: 25,
  },
  modalMsgRow: {
    // borderWidth: 1,
    marginBottom: 25,
  },
  modalButtonRow: {
    flexDirection: 'row',
    // marginTop: 10,
  },
  button: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
  },
});

export default RemoveModal;
