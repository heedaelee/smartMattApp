/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Children} from 'react';
import {View} from 'react-native';
import InputBox from '~/components/molecules/InputBox';
import Theme from '~/lib/Theme';
import CheckBox from '@react-native-community/checkbox';
import {MenuText} from '~/components/atoms/Text';
import {Container} from '~/components/atoms/Container';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

type AgreeCheckFormProps = {
  toggleState: boolean;
  setToggleState: (active: boolean) => void;
  navigation: StackNavigationProp<LoginStackNaviParamList>;
  naviPage: string;
  children?: any;
};

const AgreeCheckForm = ({
  setToggleState,
  toggleState,
  navigation,
  naviPage,
  children,
}: AgreeCheckFormProps) => {
  return (
    <RowFlexTextView>
      <CheckBox
        value={toggleState}
        onValueChange={() => setToggleState(!toggleState)}
      />
      <MenuText size={'12px'} color={Theme.color.gray}>
        {children}
      </MenuText>
      {(naviPage === 'SignUpBioDataAgree' ||
        naviPage === 'SignUpPrivateAgree') && (
        <MenuText
          size={'12px'}
          color={Theme.color.gray}
          onPress={() => navigation.navigate(naviPage)}
          style={{
            position:'absolute',
            right:10,
            textDecorationLine: 'underline',
            textDecorationColor: Theme.color.gray,
          }}>
          {'내용보기'}
        </MenuText>
      )}
    </RowFlexTextView>
  );
};

const RowFlexTextView = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export default AgreeCheckForm;
