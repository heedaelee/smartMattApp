/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Keyboard} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Container} from '~/components/atoms/Container';
import { MenuText } from '~/components/atoms/Text';
import DownKeyboard from '~/lib/DownKeyboard';

type SignUpBioDataAgreeProps = {
  navigation: StackNavigationProp<
    LoginStackNaviParamList,
    'SignUpBioDataAgree'
  >;
};

const SignUpBioDataAgree = ({
  navigation,
}: SignUpBioDataAgreeProps) => {
  return (
    <DownKeyboard>
      <Container>
        <MenuText>생체 데이터 동의 약관</MenuText>
      </Container>
    </DownKeyboard>
  );
};

export default SignUpBioDataAgree;
