/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MenuText} from '~/components/atoms/Text';
import {Button, Card, Modal} from '@ui-kitten/components';
import {TimePicker} from 'react-native-simple-time-picker';
import useInput from '~/hooks/useInput';
import DownKeyboard from '~/lib/DownKeyboard';

type AlarmSettingModalProps = {
  modalVisible: boolean;
  setModalVisible: (active: boolean) => void;
  submitAlarmData: (
    hours: submitAlarmData['hours'],
    minutes: submitAlarmData['minutes'],
  ) => void;
};

const AlarmSettingModal = ({
  modalVisible,
  setModalVisible,
  submitAlarmData,
}: AlarmSettingModalProps) => {
  console.log(`modalvisible : ${modalVisible}`);

  //ui-kitten <Modal>컴포넌트의  visible이 아마 값만 들어가면 리랜더링 되는 구조일듯. 그래서 만약 아래 useState를 이 함수 밖에 전역에 셋팅해주고 <TimePicker>같은 내부 컨텐츠 부분에 setState를 해주면, 리랜더링 되면서 계속 visible 부분에 boolean값을 던지므로 무한 리렌더링이 되어 Cannot update during an existing state transition (such as within `render`).에러가 뜬다. 그래서 모달 내부 컨텐츠 부분의 timePicker 값이 변동되더라도 전체 모달 컴포넌트의 proptery인 visible 값이 변경 되지 않도록 컴포넌트를 분기해서 setState도 분기 시키는 구조임.
  const StatefulModalContent = (props: any) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const handleChange = (value: {hours: number; minutes: number}) => {
      console.log(`hours : ${value.hours} minutes : ${value.minutes}`);
      setHours(value.hours);
      setMinutes(value.minutes);
    };

    return (
      <Card disabled={true} style={styles.cardStyle}>
        <View style={styles.modalTitleRow}>
          <MenuText size={'18px'}>알림 시간 설정</MenuText>
        </View>
        <View style={styles.contentRow}>
          <TimePicker
            value={{hours, minutes}}
            onChange={handleChange}
            pickerShows={['hours', 'minutes']}
            hoursUnit={'시간'}
            minutesUnit={'분'}
            minutesInterval={5}
          />
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
            onPress={() => submitAlarmData(hours, minutes)}>
            저장
          </Button>
        </View>
      </Card>
    );
  };

  return (
    <DownKeyboard>
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}>
        <StatefulModalContent />
      </Modal>
    </DownKeyboard>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardStyle: {
    width: 300,
    flexDirection: 'column',
    // borderWidth: 4,
    // borderColor: 'red',
  },
  modalTitleRow: {
    // borderWidth: 1,
    marginBottom: 25,
  },
  contentRow: {
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

export default AlarmSettingModal;
