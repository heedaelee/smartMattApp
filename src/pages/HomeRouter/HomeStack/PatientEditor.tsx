/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {Avatar} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import styled from 'styled-components/native';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import InputBox from '~/components/molecules/InputBox';
import TextBox from '~/components/molecules/TextBox';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import {useSelectedPatient} from '~/hooks/useReduce';
import DownKeyboard from '~/lib/DownKeyboard';
import Axios from 'axios';
import {Device, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import {useLoggedUser} from '~/hooks/useReduce';

export type patientEditorProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
  route: RouteProp<HomeStackNaviParamList, 'PatientEditor'>;
};

const PatientEditor = ({navigation, route}: patientEditorProps) => {
  //screen : 환자 추가 | 환자 상세 | 환자 수정
  //3가지 종류에 따라 다른 컴포넌트 조건 분기

  let {screen, deviceCode} = route.params;
  console.log(`route.param : ${JSON.stringify(route.params)}`);

  const [selectedPatient] = useSelectedPatient();
  console.log(`selectedPatient : ${JSON.stringify(selectedPatient)}`);

  const [userState] = useLoggedUser();

  //NOTE: INPUT state
  const [patientName, setPatientName] = useInput('');
  // const [deviceCode, setDeviceCode] = useInput('');
  const [patientCondition, setPatientCondition] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isPatinetName, setIsPatinetName] = useBoolean(false);
  // const [isDeviceCode, setIsDeviceCode] = useBoolean(false);
  const [isPatientCondition, setIsPatientCondition] = useBoolean(false);

  //TODO: 선택된 환자 추가및 수정 서버 데이터 비동기 전송 로직 해야함
  const onAddPatientSubmit = async () => {
    //NOTE:에뮬 -> node 통신 프로토콜
    // await Axios.get('http://10.0.2.2:4000/api')
    //   .then(res => console.log(res))
    //   .catch(e => console.log(e));
    console.log(`addPatientCheck : ${patientName}  ${deviceCode} ${patientCondition}`);
    console.log('서버탐, id:');
    console.log(userState.id);

    const postData = JSON.stringify({
      deviceCode: deviceCode,
      patientName: patientName,
      patientCondition: patientCondition || '',
      caregiver_id: userState.id,
    });

    await Axios.post(NODE_API + Device.CREATE_DEVICE_API, postData, jsonHeader)
      .then(res => {
        console.log('res받음', JSON.stringify(res));
        const {success, message} = res.data;
        if (success) {
          console.log('insert 성공');
          //DeivceCode 존재
          // navigation.navigate('PatientEditor', {
          //   screen: '환자 추가',
          //   deviceCode,
          //   patient_id: res.data.patient_id,
          // });
          navigation.navigate('HomeTabRouter', {screen: '환자 목록'});
        } else {
          console.log('DeviceCodeCheckSubmit server api success:false');
          switch (message) {
            case 'empty params':
              Alert.alert('empty params');
              break;
            case 'db error':
              Alert.alert('db error');
              break;
            case '디바이스 없음':
              Alert.alert('다비아스 코드가 없습니다.');
              break;
            case '환자 이미 존재':
              Alert.alert('이미 추가된 디바이스코드 입니다.');
              break;
          }
        }
      })
      .catch(e => console.log(`에러 : ${JSON.stringify(e)}`));

    // if (screen === '환자 수정') {
    //   Toast.show('수정했습니다');
    // }
    // navigation.navigate('HomeTabRouter', {screen: '환자 목록'});
  };

  useEffect(() => {
    if (screen === '환자 수정') {
      const {id, patientName, patientCondition} = selectedPatient;
      //환자 수정 페이지시 리덕스에 selected 데이터 갖고와 setState 해줌
      setPatientName(patientName);
      //아직 기기코드가 없으니깐. id로 대체
      //setDeviceCode(id);
      patientCondition && setPatientCondition(patientCondition);
    }
    // if (deviceCode) {
    //   console.log("디바이스 코드로 인한 1회 리랜더링")
    //   setIsDeviceCode(true);
    // }
    //컴포넌트 unmount시 초기화 함수 호출
    // return initializer();
  });

  let buttonText = '';
  switch (screen) {
    case '환자 추가':
      buttonText = '등록하기';
      break;
    case '환자 상세':
      buttonText = '확인';
      break;
    case '환자 수정':
      buttonText = '수정하기';
      break;
  }

  //상태 초기화
  // function initializer() {
  //   console.log('init 호출')
  //   if (deviceCode) {
  //     deviceCode = '';
  //   }
  // }

  return (
    <DownKeyboard>
      <Container style={{marginBottom: 29}}>
        <AvatarRow>
          <Avatar size={'giant'} source={require('~/asset/img/Defaultuser.png')} />
        </AvatarRow>
        <TwoInputsRow>
          <View style={{marginTop: 20}} />
          <InputBox
            menuText={'환자이름'}
            state={patientName}
            setState={setPatientName}
            placeholder={'환자 이름을 입력해주세요. 예) 홍길동'}
            validationType={'patientName'}
            setValidationToggle={setIsPatinetName}
            validationState={isPatinetName}
          />
          <View style={{marginTop: 25}} />
          <InputBox
            menuText={'기기 번호'}
            state={deviceCode || ''}
            checkedExist={'success'}
            setState={() => undefined}
          />
          {console.log('serial num is ', deviceCode)}
          <View style={{marginTop: 25}} />
          <TextBox
            menuText={'환자 상태'}
            value={patientCondition}
            setValue={setPatientCondition}
            placeholder={'150자 이내 작성해주세요'}
            validationType={'patientCondition'}
            setValidationToggle={setIsPatientCondition}
            validationState={isPatientCondition}
          />
        </TwoInputsRow>
        <TextBoxAndButtonRow>
          {deviceCode && isPatinetName ? (
            <Button onPress={onAddPatientSubmit}>{buttonText}</Button>
          ) : (
            <Button disabled={true}>{buttonText}</Button>
          )}
        </TextBoxAndButtonRow>
      </Container>
    </DownKeyboard>
  );
};

const AvatarRow = styled.View`
  flex: 1.8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border: 1px;
  border-color: gray; */
`;
const TwoInputsRow = styled.View`
  flex: 6;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* border: 1px;
  border-color: gray; */
`;
const TextBoxAndButtonRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  flex: 3;
  width: 100%;
  /* border-width: 1px; */
  /* border-color: gray; */
`;

export default PatientEditor;
