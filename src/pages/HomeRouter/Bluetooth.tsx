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
  /* TODO: BLE 모듈 5/19 ~  */

  const [isBleConn, setIsBleConn] = useBoolean(false);
  const [isEdit, setIsEdit] = useBoolean(false);
  const [ssid, setSsid] = useInput('');
  const [password, setPassword] = useInput('');

  //TODO: ToMake : 유효성 체크 후 수정 wifi ssid, pw 전송 submit Function
  const submitToMatt = () => {
    let SSID = `SSID:${ssid}`;
    let PASS = `PASS:${password}`;
    console.log(`ssid: ${ssid} pass: ${password}`);
  };

  //Wifi password encrypted
  const encryptedPassword = () => {
    const passCnt = password.length;
    let newPassword = '';
    for (let i = 0; i < passCnt; i++) {
      newPassword += '*';
    }
    return newPassword;
  };
  const NewPassword = encryptedPassword();
  console.log(`isEdit : ${isEdit}`);
  //수정페이지로 전환
  const goToEditPage = () => {
    setIsEdit(true);
  };

  return (
    <BluetoothTemplate
      navigation={navigation}
      state={{isBleConn, ssid, NewPassword, isEdit}}
      setState={{
        setIsBleConn,
        setSsid,
        setPassword,
        setIsEdit,
      }}
      goToEditPage={goToEditPage}
      submitToMatt={submitToMatt}
    />
  );
};

export default Bluetooth;
