/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import SignUpTemplate from '~/components/templates/LoginRouter/SignUp/SignUpTemplate';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';

export type SignUpProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUp'
  >;
};

const SignUp = ({navigation}: SignUpProps) => {
  /*Done 21/5/9: 
  1. 이메일 확인 액션, 유효성 체크
  2. 이메일 주소, 비밀번호입력, 확인 유효성 체크
  3. 계속하기 button disabled -> able 
  */

  //NOTE: INPUT state
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [password2, setPassword2] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);
  const [isPassword2, setIsPassword2] = useBoolean(false);

  //이메일 post check 토글 할필요 있네.. 버튼 이 맞는 값이 되야 작동시키지
  //console.log(`SignUp component : ${isEmail} `);

  //이메일 체크 함수
  const emailCheckSubmit = () => {
    // TODO: API 서버로 이메일 체크 호출
    console.log('emailCheck : ', email);
  };

  //signUp2로 이동 네비게이터 함수:파라미터 전달 {email,password}
  const moveToSignUp2 = () => {
    navigation.navigate('SignUp2', {
      email: email,
      password: password,
    });
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
        password: {
          isPassword,
          setIsPassword,
          isPassword2,
          setIsPassword2,
        },
      }}
      emailCheckSubmit={emailCheckSubmit}
      moveToSignUp2={moveToSignUp2}
    />
  );
};

export default SignUp;
