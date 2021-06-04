/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import { Avatar } from '@ui-kitten/components';
import React from 'react';
import {
  View
} from 'react-native';
import styled from 'styled-components/native';
import { Button } from '~/components/atoms/Button';
import { Container } from '~/components/atoms/Container';
import InputBox from '~/components/molecules/InputBox';
import TextBox from '~/components/molecules/TextBox';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import DownKeyboard from '~/lib/DownKeyboard';

export type AddPatientProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const AddPatient = ({navigation}: AddPatientProps) => {
  //NOTE: INPUT state
  const [patientName, setPatientName] = useInput('');
  const [deviceCode, setDeviceCode] = useInput('');
  const [patientCondition, setPatientCondition] = useInput(
    '',
  );

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isPatinetName, setIsPatinetName] = useBoolean(
    false,
  );
  const [isDeviceCode, setIsDeviceCode] = useBoolean(false);
  const [
    isPatientCondition,
    setIsPatientCondition,
  ] = useBoolean(false);

  //TODO: 서버 데이터 전송 함수 and List로 이동 : 버튼_추가하기
  const addPatientSubmit = () => {
    console.log(
      `addPatientCheck : ${patientName}  ${deviceCode} ${patientCondition}`,
    );
    navigation.navigate('HomeTabRouter');
  };

  return (
    <DownKeyboard>
      <Container style={{marginBottom: 20}}>
        <AvatarRow>
          <Avatar
            size={'giant'}
            source={require('~/asset/img/Defaultuser.png')}
          />
        </AvatarRow>
        <TwoInputsRow>
          <View style={{marginTop: 20}} />
          <InputBox
            menuText={'환자이름'}
            state={patientName}
            setState={setPatientName}
            placeholder={'환자 이름을 입력해주세요'}
            validationType={'patientName'}
            setValidationToggle={setIsPatinetName}
            validationState={isPatinetName}
          />
          <View style={{marginTop: 25}} />
          <InputBox
            menuText={'기기코드'}
            state={deviceCode}
            setState={setDeviceCode}
            placeholder={'코드번호를 입력해주세요'}
            validationType={'deviceCode'}
            setValidationToggle={setIsDeviceCode}
            validationState={isDeviceCode}
          />
          <View style={{marginTop: 25}} />
          <TextBox
            menutText={'환자 상태'}
            value={patientCondition}
            setValue={setPatientCondition}
            placeholder={'내용을 입력해주세요'}
          />
        </TwoInputsRow>
        <TextBoxAndButtonRow>
          <Button>등록하기</Button>
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
  /* border: 1px;
  border-color: gray; */
`;

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//   },
// });

export default AddPatient;
