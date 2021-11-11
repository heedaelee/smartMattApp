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

  let {screen, deviceCode: deviceCodeFromParams} = route.params;
  console.log(`route.param : ${JSON.stringify(route.params)}`);

  const [selectedPatient] = useSelectedPatient();
  console.log(`selectedPatient : ${JSON.stringify(selectedPatient)}`);

  const [userState] = useLoggedUser();

  //NOTE: INPUT state
  const [patientName, setPatientName] = useInput('');
  const [deviceCode, setDeviceCode] = useInput('');
  const [patientCondition, setPatientCondition] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isPatinetName, setIsPatinetName] = useBoolean(false);
  // const [isDeviceCode, setIsDeviceCode] = useBoolean(false);
  const [isPatientCondition, setIsPatientCondition] = useBoolean(false);

  //환자 추가

  /**NOTE:
   * 기능 : 환자 데이터 수정
   * 작업일 : 11/10
   * in:
   * out: {}
   */

  const onAddAndPatientSubmit = async () => {
    //NOTE:에뮬 -> node 통신 프로토콜
    // await Axios.get('http://10.0.2.2:4000/api')
    //   .then(res => console.log(res))
    //   .catch(e => console.log(e));
    console.log(
      `addPatientCheck : ${patientName}  ${deviceCodeFromParams} ${patientCondition}`,
    );
    console.log('서버탐, id:');
    console.log(userState.id);

    const postData = JSON.stringify({
      deviceCode: deviceCodeFromParams,
      patientName: patientName,
      patientCondition: patientCondition || '',
      caregiver_id: userState.id,
    });

    let apiAddr =
      (screen === '환자 추가' && Device.CREATE_DEVICE_API) ||
      (screen === '환자 수정' && Device.UPDATE_DEVICE_API);

    console.log('====================================');
    console.log(`보내는 값 TEST : ${postData}`);
    console.log(`보내는 주소 Addr : ${apiAddr}`);
    console.log('====================================');

    await Axios.post(NODE_API + apiAddr, postData, jsonHeader)
      .then(res => {
        console.log('res받음', JSON.stringify(res));
        const {success, message} = res.data;
        if (success) {
          if (screen === '환자 추가') {
            console.log('create 성공');
            Toast.show('추가되었습니다');
          } else if (screen === '환자 수정') {
            console.log('update 성공');
            Toast.show('수정되었습니다');
          }
          navigation.reset({routes: [{name: 'HomeTabRouter'}]});
        } else {
          console.log('DeviceCodeCheckSubmit server api success:false');
          switch (message) {
            case 'empty params':
              Alert.alert('empty params');
              break;
            case 'db error':
              Alert.alert('db error');
              break;
            case 'db update error':
              Alert.alert('db update error');
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
      const {patientName, patientCondition, deviceCode} = selectedPatient;
      //환자 수정 페이지시 리덕스에 selected 데이터 갖고와 setState 해줌
      setPatientName(patientName);
      setDeviceCode(deviceCode);
      patientCondition && setPatientCondition(patientCondition);
    }
    // if (deviceCode) {
    //   console.log("디바이스 코드로 인한 1회 리랜더링")
    //   setIsDeviceCode(true);
    // }
    //컴포넌트 unmount시 초기화 함수 호출
    // return initializer();
  }, []);

  let buttonText = '';
  // let submitBtnType;

  switch (screen) {
    case '환자 추가':
      buttonText = '등록하기';
      // submitBtnType = onAddAndPatientSubmit;
      break;
    // 상세 보류
    // case '환자 상세':
    //   buttonText = '확인';
    //   break;
    case '환자 수정':
      buttonText = '수정하기';
      // submitBtnType = onEditPatientSubmit;
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
            state={deviceCodeFromParams || ''}
            checkedExist={'success'}
            setState={() => undefined}
          />
          {console.log('serial num is ', deviceCodeFromParams)}
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
          {deviceCodeFromParams && isPatinetName ? (
            <Button onPress={onAddAndPatientSubmit}>{buttonText}</Button>
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
