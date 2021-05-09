/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';
import {Text} from 'react-native';
import SignUpTemplate from '~/components/templates/LoginRouter/SignUp/SignUpTemplate';
import useInput from '~/hooks/useInput';
import useBoolean from '~/hooks/useBoolean';

export type SignUpProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUp'
  >;
};

const SignUp = ({navigation}: SignUpProps) => {
  /*TODO: 
  1. 이메일 확인 액션, 유효성 체크
  2. 이메일 주소, 비밀번호입력, 확인 유효성 체크
  3. 계속하기 button disabled -> able 후 submit 액션까지
  */

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [password2, setPassword2] = useInput('');

  //유효성 체크 OK 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);

  //이메일 post check 토글 할필요 있네.. 버튼 이 맞는 값이 되야 작동시키지
  console.log(`SignUp component : ${isEmail} `);
  //이메일 체크 함수
  const emailCheckSubmit = () => {
    // TODO: API 서버로 이메일 체크 호출
    console.log('emailCheck : ', email);
  };

  return (
    <SignUpTemplate
      navigation={navigation}
      email={email}
      password={password}
      password2={password2}
      setEmail={setEmail}
      setPassword={setPassword}
      setPassword2={setPassword2}
      validation={{
        email: {isEmail, setIsEmail},
        password: {isPassword, setIsPassword},
      }}
      emailCheckSubmit={emailCheckSubmit}
    />
  );
};

export default SignUp;
