/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {MenuText} from '~/components/atoms/Text';
import {InputData} from '~/components/atoms/TextInput';
import {Validation} from '~/lib/Validation';

type InputBoxProps = {
  menuText: string;
  secureTextEntry?: boolean;
  children?: any;
  placeholder?: string;
  setState?: (text: string) => void;
  state?: string;
  validationType?: string;
  validationState?: boolean;
  setValidationToggle?: (active: boolean) => void;
};

const InputBox = ({
  menuText,
  secureTextEntry,
  placeholder,
  children,
  setState,
  state,
  validationType,
  setValidationToggle, //validation boolean value set 하는 함수
  validationState, //validation boolean value
}: InputBoxProps) => {
  return (
    <InputBoxWrapper>
      <MenuText textAlign={'left'}>{menuText}</MenuText>
      <InputData
        placeholder={placeholder}
        placeholderTextColor="gray"
        secureTextEntry={secureTextEntry}
        setState={setState}
      />
      {console.log(`validationType: ${validationType} state: ${state} `)}
      {validationType && state ? (
        <Validation
          type={validationType}
          state={state}
          validationState={validationState}
          setValidationToggle={setValidationToggle}
        />
      ) : null}

      {children}
    </InputBoxWrapper>
  );
};

const InputBoxWrapper = styled.View`
  width: 100%;
`;
export default InputBox;
