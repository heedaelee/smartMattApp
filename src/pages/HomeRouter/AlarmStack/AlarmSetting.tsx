/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import DownKeyboard from '~/lib/DownKeyboard';
import {Container} from '~/components/atoms/Container';
import {Divider} from '@ui-kitten/components';
import {MenuText} from '~/components/atoms/Text';
import Theme from '~/lib/Theme';
import useBoolean from '~/hooks/useBoolean';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AlarmSettingModal from '~/components/organisms/modal/AlarmSettingModal';

type AlarmSettingProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const AlarmSetting = ({navigation}: AlarmSettingProps) => {
  const [isFirstAlarm, setIsFirstAlarm] = useBoolean(false);
  const [alarmModalVisible, setAlarmModalVisible] = useBoolean(false);

  console.log(`isFirstAlarm 상태 : ${isFirstAlarm}`);

  //function : open Alarm modal
  const onPressAlarmTime = () => {
    console.log('알람모달 open');
    setAlarmModalVisible(true);
  };

  //function : send alarm set-value to API server
  const submitAlarmData = (
    hours: submitAlarmData['hours'],
    minutes: submitAlarmData['minutes'],
  ) => {
    console.log(`hour,minutes in submitAlarmData : ${hours} ${minutes}`);
  };

  return (
    <DownKeyboard>
      <Container style={styles.container}>
        <View style={styles.alarmListView}>
          <Divider />
          <View style={styles.itemView}>
            <View style={styles.itemInnerLeft}>
              <TouchableOpacity
                style={styles.tochable}
                onPress={isFirstAlarm ? () => onPressAlarmTime() : undefined}>
                <MenuText
                  style={{textAlign: 'left'}}
                  color={isFirstAlarm ? Theme.color.gray : Theme.color.lightGray}>
                  압력 지속시 알림
                </MenuText>
              </TouchableOpacity>
            </View>
            <View style={styles.itemInnerRight}>
              <TouchableOpacity
                onPress={isFirstAlarm ? () => onPressAlarmTime() : undefined}>
                <MenuText
                  style={styles.alarmTimeText}
                  color={isFirstAlarm ? Theme.color.blue : Theme.color.lightGray}>
                  04:00
                </MenuText>
              </TouchableOpacity>
              <Switch
                style={{
                  transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                }}
                trackColor={{true: '#e3e2e2', false: '#767577'}}
                thumbColor={isFirstAlarm ? '#0E76FF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={isFirstAlarm}
                onValueChange={() => {
                  setIsFirstAlarm(!isFirstAlarm);
                }}
              />
            </View>
          </View>
          <Divider />
        </View>
        <AlarmSettingModal
          modalVisible={alarmModalVisible}
          setModalVisible={setAlarmModalVisible}
          submitAlarmData={submitAlarmData}
        />
      </Container>
    </DownKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    // borderWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  alarmListView: {
    width: '100%',
    marginTop: 15,
    // borderWidth: 1,
  },
  itemView: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
  },
  itemInnerLeft: {
    // borderWidth: 1,
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
  },
  itemInnerRight: {
    // borderWidth: 1,
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  alarmTimeText: {
    marginRight: 30,
    textDecorationLine: 'underline',
  },
  tochable: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
});

export default AlarmSetting;
