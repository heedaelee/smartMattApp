/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import InputBox from '~/components/molecules/InputBox';
import useInput from '~/hooks/useInput';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import useBoolean from '~/hooks/useBoolean';
import Axios from 'axios';
import {Device, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import {useLoggedUser} from '~/hooks/useReduce';
import {Alert} from 'react-native';
import DownKeyboard from '~/lib/DownKeyboard';

export type AddDeviceProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList, 'AddDevice'>;
};

const AddDevice = ({navigation}: AddDeviceProps) => {
  const [deviceCode, setDeviceCode] = useInput('');
  const [isDeviceCode, setIsDeviceCode] = useBoolean(false);
  //코드성 변수 : unchecked = '', duplicated = 'fail', fine = 'success'
  const [checkedExist, setCheckedExist] = useInput('');
  // for 유저 id 값 알아내기
  const [userState, setUserReducer] = useLoggedUser();

  const onClickDeviceCodeSubmit = async () => {
    console.log('adddevice: serial is #', deviceCode);

    const postData = JSON.stringify({deviceCode: deviceCode, caregiver_id: userState.id});
    console.log('서버탐');
    await Axios.post(NODE_API + Device.IS_DEVICE_API, postData, jsonHeader).then(res => {
      if (res.data.success) {
        //이 유무체크는 이메일등과 반대로, 있어야 하는거니깐, if(hasCode)=> success
        //DeivceCode 존재한다면,
        if (res.data.hasCode) {
          //Code가 등록되었냐? 아님 미등록이냐?
          console.log('====================================');
          console.log(res.data.usedCode);
          console.log('====================================');
          if (res.data.usedCode) {
            //등록되어 있을떄
            Alert.alert('이미 추가된 환자입니다');
            return;
          } else {
            //등록되어 있지 않을때
            //환자 id가 있으면,
            if (res.data.patient_id) {
              navigation.navigate('PatientEditor', {
                screen: '환자 추가',
                deviceCode,
                patient_id: res.data.patient_id,
              });
            } else {
              console.log('patient_id 받아오기 실패');
            }
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
    <DownKeyboard>
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
    </DownKeyboard>
  );
};

export default AddDevice;
