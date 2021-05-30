/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import BluetoothTemplate from '~/components/templates/HomeRouter/Bluetooth/BluetoothTemplate';
import useInput from '~/hooks/useInput';
import useBoolean from '~/hooks/useBoolean';

type BluetoothProps = {
  navigation: StackNavigationProp<
    HomeStackNaviParamList,
    'Bluetooth'
  >;
};

const Bluetooth = ({navigation}: BluetoothProps) => {
  /* TODO: BLE 모듈 5/19 ~  
    TODO: 추후 BLE데이터 받아오기.
  */

  const [isBleConn, setIsBleConn] = useBoolean(false);
  const [isEdit, setIsEdit] = useBoolean(false);
  const [ssid, setSsid] = useInput('');
  const [ssidPassword, setSsidPassword] = useInput('');
  //유효성
  const [isSsid, setIsSsid] = useBoolean(false);
  const [isSsidPassword, setIsSsidPassword] = useBoolean(
    false,
  );

  //BLE 꺼지면..
  if (!isBleConn) {
    initializer();
  }
  //상태 초기화
  function initializer() {
    if (isEdit) {
      setIsEdit(false);
    }
    if (ssid) {
      setSsid('');
    }
    if (ssidPassword) {
      setSsidPassword('');
    }
  }

  //TODO: ToMake : 유효성 체크 후 수정 wifi ssid, pw 전송 submit Function
  const submitToMatt = () => {
    let SSID = `SSID:${ssid}`;
    let PASS = `PASS:${ssidPassword}`;
    console.log(`ssid: ${ssid} pass: ${ssidPassword}`);
    navigation.navigate('BottomNaviRouter', {
      screen: '홈',
    });
  };

  //Wifi password encrypted
  const encryptedPassword = () => {
    const passCnt = ssidPassword.length;
    let newPassword = '';
    for (let i = 0; i < passCnt; i++) {
      newPassword += '*';
    }
    return newPassword;
  };
  const NewEncryptedPassword = encryptedPassword();
  console.log(`isEdit : ${isEdit}`);
  //수정페이지로 전환
  const goToEditPage = () => {
    setIsEdit(true);
  };

  return (
    <BluetoothTemplate
      navigation={navigation}
      state={{
        isBleConn,
        ssid,
        ssidPassword,
        NewEncryptedPassword,
        isEdit,
      }}
      setState={{
        setIsBleConn,
        setSsid,
        setSsidPassword,
        setIsEdit,
      }}
      validation={{
        ssid: {isSsid, setIsSsid},
        ssidPassword: {isSsidPassword, setIsSsidPassword},
      }}
      goToEditPage={goToEditPage}
      submitToMatt={submitToMatt}
    />
  );
};

export default Bluetooth;
