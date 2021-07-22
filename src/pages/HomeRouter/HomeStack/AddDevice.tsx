/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import InputBox from '~/components/molecules/InputBox';
import useInput from '~/hooks/useInput';
import { Button } from '~/components/atoms/Button';
import PatientEditor from './PatientEditor';
import { Container } from '~/components/atoms/Container';
import useBoolean from '~/hooks/useBoolean';

export type AddDeviceProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'AddDevice'>;

};

const AddDevice = ({ navigation }: AddDeviceProps) => {

  const [deviceSerial, setDeviceSerial] = useInput('');
  const [isDeviceSerial, setIsDeviceSerial] = useBoolean(false);

  const onClickDeviceCodeSubmit = () => {
    // console.log('adddevice: serial is #', deviceSerial)
    const upperedSerial = deviceSerial.toUpperCase();
    console.log(upperedSerial);
    navigation.navigate('PatientEditor', { screen: '환자 추가', upperedSerial, setDeviceSerial });
  };


  return (
    <Container>
      <InputBox
        menuText={'6자리 기기코드를 입력해 주세요'}
        state={deviceSerial}
        setState={setDeviceSerial}
        placeholder={'6자리 형태입니다'}
        validationType={'deviceCode'}
        setValidationToggle={setIsDeviceSerial}
        validationState={isDeviceSerial}
      />
      {isDeviceSerial ? (
        <Button style={{ marginTop: 20 }} onPress={onClickDeviceCodeSubmit}>{'기기 코드 전송'}</Button>
      ) : (
        <Button style={{ marginTop: 20 }} disabled={true}>{'기기 코드 전송'}</Button>
      )}
    </Container>

  );
};

export default AddDevice;
