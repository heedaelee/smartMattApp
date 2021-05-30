/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import useBoolean from '~/hooks/useBoolean';
import useInput from '~/hooks/useInput';
import {UserContext} from '~/lib/userProvider/UserProvider';
import SignInTemplate from '../../components/templates/LoginRouter/SignIn/SignInTemplate';

type SignInProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignIn'
  >;
};

const SignIn = ({navigation}: SignInProps) => {
  /* DONE: 로그인 Template, hooks 불러오기 */
  const [
    autoLoginCheck,
    setAutoLoginCheck,
  ] = useState<boolean>(true);

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  //NOTE: 유효성 체크 토글: 유효성 정상이면 true
  const [isEmail, setIsEmail] = useBoolean(false);
  const [isPassword, setIsPassword] = useBoolean(false);

  const {login} = useContext(UserContext);

  //TODO: 유효성 체크 후 api server로 submit 로직 만들기
  const submit = () => {
    console.log(`email : ${email}, password : ${password} 
    loginType : 'email', isAutoLogin : ${autoLoginCheck}
    `);
    login(email, password, 'email', autoLoginCheck);
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
