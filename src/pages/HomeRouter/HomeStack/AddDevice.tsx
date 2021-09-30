/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import InputBox from '~/components/molecules/InputBox';
import useInput from '~/hooks/useInput';
import {Button} from '~/components/atoms/Button';
import PatientEditor from './PatientEditor';
import {Container} from '~/components/atoms/Container';
import useBoolean from '~/hooks/useBoolean';
import Axios from 'axios';
import {Device, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';

export type AddDeviceProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList, 'AddDevice'>;
};

const AddDevice = ({navigation}: AddDeviceProps) => {
  const [deviceCode, setDeviceCode] = useInput('');
  const [isDeviceCode, setIsDeviceCode] = useBoolean(false);

  //코드성 변수 : unchecked = '', duplicated = 'fail', fine = 'success'
  const [checkedExist, setCheckedExist] = useInput('');

  const onClickDeviceCodeSubmit = async () => {
    console.log('adddevice: serial is #', deviceCode);

    const postData = JSON.stringify({deviceCode: deviceCode});
    console.log('서버탐');
    await Axios.post(NODE_API + Device.IS_DEVICE_API, postData, jsonHeader).then(res => {
      if (res.data.success) {
        //이 유무체크는 이메일등과 반대로, 있어야 하는거니깐, if(used)=> success
        if (res.data.used) {
          //DeivceCode 존재
          if (res.data.patient_id) {
            navigation.navigate('PatientEditor', {
              screen: '환자 추가',
              deviceCode,
              patient_id: res.data.patient_id,
            });
          } else {
            console.log('patient_id 받아오기 실패');
          }
        } else {
          //DeivceCode 비존재
          setCheckedExist('fail');
        }
      } else {
        console.log('DeviceCodeCheckSubmit server api fail');
        console.log(res.data);
      }
    });
  };

  return (
    <Container>
      <InputBox
        menuText={'6자리 기기코드를 입력해 주세요'}
        state={deviceCode}
        setState={setDeviceCode}
        placeholder={'6자리 형태입니다'}
        validationType={'deviceCode'}
        setValidationToggle={setIsDeviceCode}
        validationState={isDeviceCode}
        setCheckedExist={setCheckedExist}
        checkedExist={checkedExist}
      />
      {isDeviceCode ? (
        <Button style={{marginTop: 20}} onPress={onClickDeviceCodeSubmit}>
          {'기기 코드 전송'}
        </Button>
      ) : (
        <Button style={{marginTop: 20}} disabled={true}>
          {'기기 코드 전송'}
        </Button>
      )}
    </Container>
  );
};

export default AddDevice;
