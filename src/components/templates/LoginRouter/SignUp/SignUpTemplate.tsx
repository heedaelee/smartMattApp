/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import {Button} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import InputBox from '~/components/molecules/InputBox';
import DownKeyboard from '~/lib/DownKeyboard';
import Theme from '~/lib/Theme';

type SignUpTemplateProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignUp'>;
  email: string;
  password: string;
  password2: string;
  name: string;
  setEmail: (active: string) => void;
  setPassword: (active: string) => void;
  setPassword2: (active: string) => void;
  setName: (active: string) => void;
  emailCheckSubmit: (active: string) => void;
  validation: {
    email: {
      isEmail: boolean;
      setIsEmail: (active: boolean) => void;
      checkedExist: string;
      setCheckedExist: (active: string) => void;
    };
    password: {
      isPassword: boolean;
      setIsPassword: (active: boolean) => void;
      isPassword2: boolean;
      setIsPassword2: (active: boolean) => void;
    };
    name: {
      isName: boolean;
      setIsName: (active: boolean) => void;
    };
  };
  moveToSignUp2: () => void;
};

const SignUpTemplate = ({
  navigation,
  email,
  password,
  password2,
  name,
  setEmail,
  emailCheckSubmit,
  setPassword,
  setPassword2,
  setName,
  validation,
  moveToSignUp2,
}: SignUpTemplateProps) => {
  return (
    <DownKeyboard>
      <Container>
        <InputBox
          menuText={'이메일을 입력해주세요'}
          placeholder={'이메일 주소 입력'}
          setState={setEmail}
          state={email}
          validationType={'email'}
          setValidationToggle={validation.email.setIsEmail}
          validationState={validation.email.isEmail}
          checkedExist={validation.email.checkedExist}
          setCheckedExist={validation.email.setCheckedExist}
        />
        <SmallButtonView>
          {validation.email.isEmail ? (
            <Button onPress={emailCheckSubmit} size={'small'}>
              이메일 확인
            </Button>
          ) : (
            <Button size={'small'} disabled={true}>
              이메일 확인
            </Button>
          )}
        </SmallButtonView>

        <RowView />
        <InputBox
          secureTextEntry={true}
          menuText={'비밀번호를 입력해주세요'}
          placeholder={'비밀번호는 8~20자 이내 숫자,영어,특수기호를 포함해주세요'}
          setState={setPassword}
          state={password}
          validationType={'password'}
          setValidationToggle={validation.password.setIsPassword}
          validationState={validation.password.isPassword}
        />
        <RowView />
        <InputBox
          secureTextEntry={true}
          menuText={'비밀번호를 다시 한번 입력해주세요'}
          placeholder={'비밀번호 재입력'}
          setState={setPassword2}
          state={password2}
          state2={password}
          validationType={'password2'}
          setValidationToggle={validation.password.setIsPassword2}
          validationState={validation.password.isPassword2}
        />
        <RowView />
        <InputBox
          maxLength={10}
          menuText={'사용할 이름을 입력해주세요'}
          placeholder={'이름은 10자까지 입력 가능합니다'}
          setState={setName}
          state={name}
          validationType={'name'}
          setValidationToggle={validation.name.setIsName}
          validationState={validation.name.isName}
        />
        <RowView />
        {validation.email.isEmail &&
        validation.password.isPassword &&
        validation.password.isPassword2 &&
        validation.name.isName &&
        validation.email.checkedExist === 'success' ? (
          <Button onPress={moveToSignUp2}>계속하기</Button>
        ) : (
          <Button disabled={true}>계속하기</Button>
        )}
      </Container>
    </DownKeyboard>
  );
};

/* border로 test 
border: 1px;
border-color: gray;
*/

const RowView = styled.View`
  margin-top: 35px;
`;
const SmallButtonView = styled.View`
  width: ${Theme._HEIGHT / 8}px;
  position: absolute;
  top: 20px;
  right: 10%;
`;

const RowValidation = styled.View`
  position: absolute;
`;

export default SignUpTemplate;
