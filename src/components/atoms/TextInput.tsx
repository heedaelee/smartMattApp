/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import Theme from '~/lib/Theme';
import {Validation} from '~/lib/Validation';

type InputDataProps = {
  children?: any;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  setState?: (text: string) => void;
};

//왼쪽 메뉴 텍스트
export const InputData = ({
  children,
  placeholderTextColor,
  secureTextEntry,
  placeholder,
  setState,
}: InputDataProps) => {
  return (
    <InputDataStyled
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      onChangeText={
        setState ? text => setState(text) : undefined
      }>
      {children}
    </InputDataStyled>
  );
};

const InputDataStyled = styled.TextInput`
  color: black;
  width: 100%;
  height: ${Theme._HEIGHT / 20}px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  font-size: ${Theme._WIDTH / 32}px;
`;
