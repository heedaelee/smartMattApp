/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Container} from '~/components/atoms/Container';
import {MenuText} from '~/components/atoms/Text';
import DownKeyboard from '~/lib/DownKeyboard';

type SignUpPrivateAgreeProps = {
  navigation: StackNavigationProp<LoginStackNaviParamList, 'SignUpPrivateAgree'>;
};

const SignUpPrivateAgree = ({navigation}: SignUpPrivateAgreeProps) => {
  return (
    <DownKeyboard>
      <Container>
        <MenuText>개인정보 취급약관</MenuText>
      </Container>
    </DownKeyboard>
  );
};

export default SignUpPrivateAgree;
