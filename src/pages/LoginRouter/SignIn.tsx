/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Axios from 'axios';
import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import {Auth, jsonHeader, NODE_API} from '~/lib/apiSite/apiSite';
import {UserContext} from '~/lib/userProvider/UserProvider';
import SignInTemplate from '../../components/templates/LoginRouter/SignIn/SignInTemplate';

type SignInProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;
};

const SignIn = ({navigation}: SignInProps) => {
  /* DONE: 로그인 Template, hooks 불러오기 */
  const [autoLoginCheck, setAutoLoginCheck] = useState<boolean>(true);

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);

  const {getUserInfo, setUserInfo} = useContext(UserContext);

  //임시 아이디 비번 : 1@1.com 123456@a
  //TODO: 유효성 체크 후 api server로 submit 로직 만들기
  const submit = () => {
    console.log(`email : ${email}, password : ${password} 
    loginType : 'email', isAutoLogin : ${autoLoginCheck}
    `);

    const postData = JSON.stringify({
      email: email,
      password: password,
      loginType: 'e',
    });

    Axios.post(NODE_API + Auth.SIGN_IN_API, postData, jsonHeader)
      .then(res => {
        console.log(`SIGN_IN_API 호출후 res값 ${JSON.stringify(res)}`);
        // response : success, token
        if (res.data.success) {
          //성공 로직 : 토큰 받기
          // token: res.data.token,
          //아래 storage에 저장
          console.log(`로그인 성공 : `);
          console.dir(res.data);
          //수신 : res.data.user

          const {id, email, token, loginType, isLogin = true} = res.data.user;
          //로그인 모듈
          setUserInfo(id, email, token, loginType, isLogin);

          const storageValue = AsyncStorage.getItem('@loginInfo');
          console.log(`저장된 @loginInfo : ${JSON.stringify(storageValue)}`);
        } else {
          if (res.data.message === '데이터 없음') {
            Alert.alert('로그인 정보를 확인해주세요');
          }
          // Alert.alert('로그인 정보를 확인해주세요');
        }
      })
      .catch(e => {
        console.log(`에러 : ${JSON.stringify(e)}`);
        console.dir(e);
      });
  };

  return (
    <SignInTemplate
      autoLoginCheck={autoLoginCheck}
      setAutoLoginCheck={setAutoLoginCheck}
      navigation={navigation}
      state={{email, password}}
      setState={{setEmail, setPassword}}
      submit={submit}
      validation={{
        email: {isEmail, setIsEmail},
        password: {
          isPassword,
          setIsPassword,
        },
      }}
    />
  );
};

export default SignIn;
