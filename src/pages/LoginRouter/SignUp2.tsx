/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import SignUp2Template from '~/components/templates/LoginRouter/SignUp2/SignUp2Template';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedUser} from '~/hooks/useReduce';

export type SignUp2Props = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUp2'
  >;
  route: RouteProp<LoginStackNaviParamList, 'SignUp2'>;
};

const SignUp2 = ({navigation, route}: SignUp2Props) => {
  /* DONE: 21/5/9 ~ 
  3. 등록하기 submit 가능 data 까지
  */

  //NOTE: INPUT state
  const [phoneNmbr, setPhoneNmbr] = useInput('');
  const [phoneAuthNmbr, setPhoneAuthNmbr] = useInput('');
  const [userState, setUserReducer] = useLoggedUser();

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isPhone, setIsPhone] = useBoolean(false);
  const [isphoneAuthNmbr, setIsphoneAuthNmbr] = useBoolean(
    false,
  );
  const [bioDataAgree, setBioDataAgree] = useBoolean(false);
  const [
    privateDataAgree,
    setPrivateDataAgree,
  ] = useBoolean(false);

  //인증번호 받기를 위한 함수
  const phoneNmbrSender = () => {
    //TODO: 인증번호 모듈로 폰번호 전송
    console.log(`PhoneNum to sender : ${phoneNmbr}`);
    Toast.showWithGravity(
      '인증번호를 전송했습니다',
      Toast.SHORT,
      Toast.CENTER,
    );
  };

  //최종 폰인증을 위한 함수
  const phoneAuthNmbrSender = () => {
    //TODO: 폰인증을 위한 함수
    console.log(
      `PhoneAuthNum to sender : ${phoneAuthNmbr}`,
    );
    Toast.showWithGravity(
      '인증 완료 :)',
      Toast.SHORT,
      Toast.CENTER,
    );
  };

  //회원가입 등록 함수
  const registrySubmit = async (
    value: registrySubmitParamList,
  ) => {
    //TODO: 회원가입 최종 데이터 API 서버 통신하기
    console.log(value);
    try {
      await AsyncStorage.setItem(
        '@loginInfo',
        JSON.stringify({
          email: value.email,
          password: value.password,
          loginType: value.loginType,
          isAutoLogin: true,
          //나중에 api 통신후..
          // token: res.data.token,
        }),
      );
      const storageValue = await AsyncStorage.getItem(
        '@loginInfo',
      );
      console.log(`storageValue : ${storageValue}`);
      setUserReducer(value);
      console.log('reduce 셋 완료');
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  return (
    <SignUp2Template
      navigation={navigation}
      route={route}
      state={{
        phoneNmbr,
        phoneAuthNmbr,
        isPhone,
        isphoneAuthNmbr,
        bioDataAgree,
        privateDataAgree,
      }}
      setState={{
        setPhoneNmbr,
        setPhoneAuthNmbr,
        setIsPhone,
        setIsphoneAuthNmbr,
        setBioDataAgree,
        setPrivateDataAgree,
      }}
      phoneNmbrSender={phoneNmbrSender}
      phoneAuthNmbrSender={phoneAuthNmbrSender}
      registrySubmit={registrySubmit}
    />
  );
};

export default SignUp2;
