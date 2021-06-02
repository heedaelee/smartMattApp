/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import {Button} from '~/components/atoms/Button';
import {Avatar} from '@ui-kitten/components';
import {Container} from '~/components/atoms/Container';
import Theme from '~/lib/Theme';

const AddPatient = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={{borderWidth: 1}} color={'black'}>
        <LogoWrapper>
          <Text>123</Text>
        </LogoWrapper>
        <LogoWrapper>
          <Text>123</Text>
        </LogoWrapper>
        {/* <AvatarRow>
          <Avatar
            source={require('~/asset/img/Defaultuser.png')}
          />
        </AvatarRow> */}
      </Container>
    </TouchableWithoutFeedback>
  );
};

const AvatarRow = styled.View`
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const LogoWrapper = styled.View`
  flex: 2;
  border: 1px;
  border-color: gray;
  justify-content: center;
  align-items: center;
`;

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//   },
// });

export default AddPatient;
