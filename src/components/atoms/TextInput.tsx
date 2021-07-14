/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';
import styled from 'styled-components/native';
import Theme from '~/lib/Theme';

type InputDataProps = {
  children?: any;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  setState: (text: string) => void;
  state: string;
  style?: StyleProp<TextStyle>;
  isEditable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

//왼쪽 메뉴 텍스트
export const InputData = ({
  children,
  placeholderTextColor,
  secureTextEntry,
  placeholder,
  setState,
  state,
  style,
  isEditable,
  keyboardType,
  maxLength,
}: InputDataProps) => {
  return (
    <InputDataStyled
      maxLength={maxLength}
      keyboardType={keyboardType}
      editable={isEditable}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      onChangeText={setState ? text => setState(text) : undefined}
      value={state}
      style={style}>
      {children}
    </InputDataStyled>
  );
};

const InputDataStyled = styled.TextInput`
  color: ${(props: any) => (props.isEditable ? 'black' : Theme.color.lightGray)};
  width: 100%;
  height: ${Theme._HEIGHT / 20}px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  font-size: ${Theme._WIDTH / 32}px;
`;
