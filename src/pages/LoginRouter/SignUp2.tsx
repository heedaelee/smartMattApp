/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Alert} from 'react-native';
import SignUp2Template from '~/components/templates/LoginRouter/SignUp2/SignUp2Template';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoggedUser} from '~/hooks/useReduce';
import {NODE_API, Auth, jsonHeader} from '~/lib/apiSite/apiSite';
import Axios from 'axios';

export type SignUp2Props = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignUp2'>;
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
  const [isphoneAuthNmbr, setIsphoneAuthNmbr] = useBoolean(false);
  const [bioDataAgree, setBioDataAgree] = useBoolean(false);
  const [privateDataAgree, setPrivateDataAgree] = useBoolean(false);

  //코드성 변수 : unchecked = '', duplicated = 'fail', fine = 'success'
  const [checkedExist, setCheckedExist] = useInput('');

  //인증번호 받기를 위한 함수
  const phoneNmbrSender = async () => {
    //TODO: 인증번호 모듈로 폰번호 전송
    console.log(`PhoneNum to sender : ${phoneNmbr}`);

    const postData = JSON.stringify({phoneNmbr: phoneNmbr});
    await Axios.post(NODE_API + Auth.IS_PHONE_API, postData, jsonHeader).then(res => {
      if (res.data.success) {
        if (res.data.used) {
          console.log('진행됨s');
          setCheckedExist('fail');
        } else {
          setCheckedExist('success');
          Toast.showWithGravity('인증번호를 전송했습니다', Toast.SHORT, Toast.CENTER);
        }
      } else {
        console.log('phoneNmbrSender server api fail');
        console.dir(res.data);
      }
    });
  };

  //최종 폰인증을 위한 함수
  const phoneAuthNmbrSender = () => {
    //TODO: 폰인증을 위한 함수
    console.log(`PhoneAuthNum to sender : ${phoneAuthNmbr}`);

    //input창 disable을 위함
    Toast.showWithGravity('인증 완료 :)', Toast.SHORT, Toast.CENTER);
  };

  //회원가입 등록 함수
  const registrySubmit = async (value: registrySubmitParamList) => {
    //TODO: 회원가입 최종 데이터 API 서버 통신하기
    console.log(value);
    try {
      const postData = JSON.stringify({
        username: value.username,
        email: value.email,
        password: value.password,
        loginType: value.loginType,
        phoneNmbr: value.phoneNmbr,
      });

      await Axios.post(NODE_API + Auth.SIGN_UP_API, postData, jsonHeader)
        .then(async res => {
          console.log('test');
          console.dir(res);
          // response : success, token
          if (res.data.success) {

            //로그인 api 호출
            Axios.post(NODE_API + Auth.SIGN_IN_API, postData, jsonHeader).then(
              async res => {
                // response : success, token
                if (res.data.success) {
                  //성공 로직 : 토큰 받기
                  // token: res.data.token,
                  //아래 storage에 저장
                  
                  await AsyncStorage.setItem('@loginInfo', JSON.stringify(value));
                  const storageValue = await AsyncStorage.getItem('@loginInfo');
                  console.log(`storageValue : ${storageValue}`);
                  setUserReducer(value);
                  console.log('reduce 셋 완료');

                  //이동
                } else {
                  Alert.alert('로그인 정보를 확인해주세요');
                }
              },
            );
          } else {
            if (res.data.message === 'email already used') {
              Alert.alert('이미 가입된 이메일입니다.');
            } else {
              Alert.alert('관리자에게 문의하세요.');
            }
          }
        })
        .catch(err => {
          console.log(`에러 : ${err}`);
          Alert.alert('에러', JSON.stringify(err));
        });
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
        checkedExist,
      }}
      setState={{
        setPhoneNmbr,
        setPhoneAuthNmbr,
        setIsPhone,
        setIsphoneAuthNmbr,
        setBioDataAgree,
        setPrivateDataAgree,
        setCheckedExist,
      }}
      phoneNmbrSender={phoneNmbrSender}
      phoneAuthNmbrSender={phoneAuthNmbrSender}
      registrySubmit={registrySubmit}
    />
  );
};

export default SignUp2;
