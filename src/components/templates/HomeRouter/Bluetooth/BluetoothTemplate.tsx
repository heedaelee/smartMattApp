/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import ButtonRow from '~/components/molecules/ButtonRow';
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
    password: string;
  };
  setState: {
    setIsBleConn: (active: boolean) => void;
    setSsid: (active: string) => void;
    setPassword: (active: string) => void;
  };
};

const BluetoothTemplate = ({
  navigation,
  state,
  setState,
}: BluetoothTemplateProps) => {
  const {isBleConn, password, ssid} = state;
  const {setIsBleConn, setPassword, setSsid} = setState;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={{backgroundColor: '#0E76FF'}}>
        <HeaderView>
          <MenuText color={'white'} size={'27px'}>
            {'매트 WIFI 설정'}
          </MenuText>
        </HeaderView>
        <BleButtonView>
          {console.log(isBleConn)}
          <Switch
            style={{
              transform: [{scaleX: 1.5}, {scaleY: 1.5}],
            }}
            trackColor={{true: '#ffffff', false: '#767577'}}
            thumbColor={isBleConn ? '#0E76FF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isBleConn}
            onValueChange={() => setIsBleConn(!isBleConn)}
          />
          <MenuText
            style={{
              marginTop: 14,
              letterSpacing: -0.5,
            }}
            size={'19px'}
            color={'#ff8080'}>
            {'블루투스 미연결'}
          </MenuText>
        </BleButtonView>
        <OtherContentsView>
          {/* THis */}
          <InfoTextRow
            TypeText={{value: 'SSID'}}
            ValueText={{value: 'seohongTech'}}
          />
          <InfoTextRow
            TypeText={{value: '비밀번호', size: '20px'}}
            ValueText={{value: '********'}}
          />
          <EmptyRow />
          <ButtonRow />
        </OtherContentsView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* border로 test 
border: 1px;
border-color: gray;
*/

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
  margin: 0px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OtherContentsView = styled.View`
  flex-direction: column;
  flex: 6;
  width: 100%;
  margin: 0px 0px;
`;
const EmptyRow = styled.View`
  flex: 2.8;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: center;
`;

const css = StyleSheet.create({
  snsLoginView: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default BluetoothTemplate;
