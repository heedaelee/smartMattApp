/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CheckBox from '@react-native-community/checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styled from 'styled-components/native';
import { MenuText } from '~/components/atoms/Text';
import Theme from '~/lib/Theme';

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
