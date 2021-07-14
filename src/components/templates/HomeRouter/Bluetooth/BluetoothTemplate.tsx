/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Keyboard,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '~/components/atoms/Container';
import {ErrorText, MenuText} from '~/components/atoms/Text';
import {BlePageRoundButtonRow} from '~/components/molecules/ButtonRow';
import InfoTextRow from '~/components/molecules/InfoTextRow';
import Theme from '~/lib/Theme';

const _WIDTH = Theme._WIDTH;
const _HEIGHT = Theme._HEIGHT;

type BluetoothTemplateProps = {
  navigation: StackNavigationProp<
    HomeStackNaviParamList,
    'Bluetooth'
  >;
  state: {
    isBleConn: boolean;
    ssid: string;
    ssidPassword: string;
    NewEncryptedPassword: string;
    isEdit: boolean;
  };
  setState: {
    setIsBleConn: (active: boolean) => void;
    setSsid: (active: string) => void;
    setSsidPassword: (active: string) => void;
    setIsEdit: (active: boolean) => void;
  };
  validation: {
    ssid: {
      isSsid: boolean;
      setIsSsid: (active: boolean) => void;
    };
    ssidPassword: {
      isSsidPassword: boolean;
      setIsSsidPassword: (active: boolean) => void;
    };
  };
  goToEditPage: () => void;
  submitToMatt: () => void;
};

const BluetoothTemplate = ({
  navigation,
  state,
  setState,
  goToEditPage,
  submitToMatt,
  validation,
}: BluetoothTemplateProps) => {
  const {
    isBleConn,
    ssidPassword,
    NewEncryptedPassword,
    ssid,
    isEdit,
  } = state;
  const {
    setIsBleConn,
    setSsidPassword,
    setSsid,
    setIsEdit,
  } = setState;

  let menuTextColor = '';
  let menuTextValue = '';
  if (isBleConn) {
    menuTextColor = '#5BEE78';
    menuTextValue = '블루투스 연결';
  } else {
    menuTextColor = '#ff8080';
    menuTextValue = '블루투스 미연결';
  }

  //수정페이지면 패스워드 :원래값, 일반 페이지면 : ***
  let passwordState;
  if (!isEdit) {
    passwordState = NewEncryptedPassword;
  } else {
    passwordState = ssidPassword;
  }

  const inputStyle = {
    color: 'white',
    fontSize: 18,
    padding: 0,
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={{backgroundColor: '#0E76FF'}}>
        <HeaderView>
          <MenuText color={'white'} size={'27px'}>
            {'매트 WIFI 설정'}
          </MenuText>
        </HeaderView>
        <BleButtonView>
          <Switch
            style={{
              transform: [{scaleX: 1.5}, {scaleY: 1.5}],
            }}
            trackColor={{true: '#ffffff', false: '#767577'}}
            thumbColor={isBleConn ? '#0E76FF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isBleConn}
            onValueChange={() => {
              setIsBleConn(!isBleConn);
            }}
          />
          {/* atoms */}
          <MenuText
            style={{
              marginTop: 14,
              letterSpacing: -0.5,
            }}
            size={'19px'}
            color={menuTextColor}>
            {menuTextValue}
          </MenuText>
          {!isBleConn && (
            <ErrorText
              size={'16px'}
              style={{marginTop: 100, color: '#ff8080'}}>
              휴대폰의 블루투스 기능을 켜주세요
            </ErrorText>
          )}
        </BleButtonView>
        <OtherContentsView>
          {/* molecules */}
          <InfoTextRow
            TypeText={{value: 'SSID'}}
            ValueText={{value: ssid}}
            isEdit={isEdit}
            setState={setSsid}
            validationType={'ssid'}
            validationState={validation.ssid.isSsid}
            setValidationToggle={validation.ssid.setIsSsid}
            inputStyle={inputStyle}
          />
          <InfoTextRow
            TypeText={{value: '비밀번호', size: '20px'}}
            ValueText={{value: passwordState}}
            validationType={'ssidPassword'}
            isEdit={isEdit}
            setState={setSsidPassword}
            validationState={
              validation.ssidPassword.isSsidPassword
            }
            setValidationToggle={
              validation.ssidPassword.setIsSsidPassword
            }
            inputStyle={inputStyle}
          />
          <EmptyRow />
          {/* molecules */}
          <BlePageRoundButtonRow
            isSsid={validation.ssid.isSsid}
            isSsidPassword={
              validation.ssidPassword.isSsidPassword
            }
            isEdit={isEdit}
            isBleConn={isBleConn}
            goToEditPage={goToEditPage}
            submitToMatt={submitToMatt}
          />
        </OtherContentsView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const HeaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* border: 1px;
  border-color: gray; */
  width: 100%;
  /* padding-top: ${_HEIGHT / 29}px; */
  flex-direction: row;
`;
const BleButtonView = styled.View`
  flex: 2;
  /* border: 1px;
  border-color: gray; */
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OtherContentsView = styled.View`
  flex-direction: column;
  flex: 6;
  width: 100%;
`;
const EmptyRow = styled.View`
  flex: 2.8;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: center;
`;

/* const css = StyleSheet.create({
  snsLoginView: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
}); */

export default BluetoothTemplate;
