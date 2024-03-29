// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {useEffect} from 'react';
import {KeyboardTypeOptions} from 'react-native';
import styled from 'styled-components/native';
import {MenuText} from '~/components/atoms/Text';
import {InputData} from '~/components/atoms/TextInput';
import useBoolean from '~/hooks/useBoolean';
import {Validation} from '~/lib/Validation';

type InputBoxProps = {
  menuText: string;
  secureTextEntry?: boolean;
  children?: any;
  placeholder?: string;
  setState: (text: string) => void;
  state: string;
  state2?: string;
  validationType?: string;
  validationState?: boolean;
  setValidationToggle?: (active: boolean) => void;
  checkedExist?: string;
  setCheckedExist?: (active: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

const InputBox = ({
  menuText,
  secureTextEntry,
  placeholder,
  children,
  setState,
  state,
  state2,
  validationType,
  setValidationToggle, //validation boolean value set 하는 함수
  validationState, //validation boolean value
  setCheckedExist,
  checkedExist,
  keyboardType,
  maxLength,
}: InputBoxProps) => {
  const [isEditable, setIsEditable] = useBoolean(true);

  useEffect(() => {
    if (checkedExist === 'success') {
      setIsEditable(false);
    }
  }, [checkedExist, setIsEditable]);

  return (
    <InputBoxWrapper>
      <MenuText textAlign={'left'}>{menuText}</MenuText>
      <InputData
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="gray"
        secureTextEntry={secureTextEntry}
        setState={setState}
        state={state}
        isEditable={isEditable}
      />
      {validationType && state ? (
        <Validation
          type={validationType}
          state={state}
          state2={state2}
          validationState={validationState}
          setValidationToggle={setValidationToggle}
          checkedExist={checkedExist}
          setCheckedExist={setCheckedExist}
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
