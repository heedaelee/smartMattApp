/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Input} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Validation} from '~/lib/Validation';
import {MenuText} from '../atoms/Text';

type TextBoxProps = {
  menutText: string;
  menuTextAlign?: 'left' | 'center' | 'right';
  placeholder?: string;
  value: string;
  setValue: (active: string) => void;
  validationType?: string;
  validationState?: boolean;
  setValidationToggle?: (active: boolean) => void;
};

const TextBox = ({
  menutText,
  menuTextAlign,
  placeholder,
  value,
  setValue,
  validationType,
  validationState,
  setValidationToggle,
}: TextBoxProps) => {
  return (
    <TextBoxWrapper>
      <MenuText textAlign={menuTextAlign || 'left'}>
        {menutText}
      </MenuText>
      <View style={{marginTop: 10}} />
      <Input
        multiline={true}
        textStyle={{minHeight: 50}}
        placeholder={placeholder}
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
      />
      {validationType && value ? (
        <Validation
          type={validationType}
          state={value}
          validationState={validationState}
          setValidationToggle={setValidationToggle}
        />
      ) : null}
    </TextBoxWrapper>
  );
};

const TextBoxWrapper = styled.View`
  width: 100%;
`;

export default TextBox;
