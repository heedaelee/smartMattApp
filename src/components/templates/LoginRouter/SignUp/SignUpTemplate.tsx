/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '~/components/atoms/Button';
import Theme from '~/lib/Theme';
import InputBox from '~/components/molecules/InputBox';
import {Container} from '~/components/atoms/Container';

type SignUpTemplateProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUp'
  >;
  email: string;
  setEmail: (active: string) => void;
  setPassword: (active: string) => void;
  setPassword2: (active: string) => void;
  emailCheckSubmit: (active: string) => void;
  validation: {email: any; password: any};
};

/*TODO: 폼그리기 after 버튼 수정후 */
const SignUpTemplate = ({
  navigation,
  setEmail,
  emailCheckSubmit,
  email,
  setPassword,
  setPassword2,
  validation,
}: SignUpTemplateProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={{justifyContent: 'flex-start'}}>
        <InputBox
          menuText={'이메일 주소 입력'}
          placeholder={'이메일을 입력해주세요'}
          setState={setEmail}
          state={email}
          validationType={'email'}
          //TODO: validation
          setValidationToggle={validation.email.setIsEmail}
          validationState={validation.email.isEmail}
        />
        <SmallButtonView>
          {validation.email.isEmail ? (
            <Button
              onPress={emailCheckSubmit}
              size={'small'}>
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
          menuText={'비밀번호 입력'}
          placeholder={
            '비밀번호는 8~20자 이내 숫자,영어,특수기호를 포함해주세요'
          }
          setState={setPassword}
        />
        <RowView />
        <InputBox
          secureTextEntry={true}
          menuText={'비밀번호 확인'}
          placeholder={'다시한번 입력해주세요'}
          setState={setPassword2}
        />
        <RowView />
        {/* TODO: input invalid 상태일떈 disabled:true 주기! */}
        <Button>계속하기</Button>
      </Container>
    </TouchableWithoutFeedback>
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
