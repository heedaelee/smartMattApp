/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {MenuText} from '../atoms/Text';
import {InputData} from '~/components/atoms/TextInput';
import {Validation} from '~/lib/Validation';
import {StyleProp, TextStyle} from 'react-native';

type InfoTextRowProps = {
  TypeText: {
    value: string;
    color?: string;
    size?: string;
    textAlign?: string;
  };
  ValueText: {
    value: string;
    color?: string;
    size?: string;
    textAlign?: string;
  };
  isEdit: boolean;
  validationType: string;
  validationState: boolean;
  setValidationToggle: (active: boolean) => void;
  setState: (active: string) => void;
  inputStyle?: StyleProp<TextStyle>;
};

const InfoTextRow = ({
  TypeText,
  ValueText,
  isEdit,
  setState,
  validationType,
  validationState,
  setValidationToggle,
  inputStyle,
}: InfoTextRowProps) => {
  let renderingTest;

  //수정모드 들어갈 시
  if (isEdit) {
    if (!ValueText.value) {
      //passwordValue가 없을시
      renderingTest = (
        <InputData
          state={ValueText.value}
          setState={setState}
        />
      );
    } else {
      // passwordValue가 있을시 -> 유효성체크
      renderingTest = (
        <>
          <InputData
            state={ValueText.value}
            style={inputStyle}
            setState={setState}
          />
          <Validation
            type={validationType}
            state={ValueText.value}
            validationState={validationState}
            setValidationToggle={setValidationToggle}
            errorTextStyle={{top: 40, fontSize: 12}}
          />
        </>
      );
    }
  } else {
    //일반모드
    renderingTest = (
      <MenuText
        color={ValueText.color || 'white'}
        size={ValueText.size || '14px'}
        textAlign={ValueText.textAlign || 'center'}>
        {ValueText.value}
      </MenuText>
    );
  }

  return (
    <TextContainer>
      <LeftDivisionView>
        <MenuText
          color={TypeText.color || 'white'}
          size={TypeText.size || '22px'}
          textAlign={TypeText.textAlign || 'left'}>
          {TypeText.value}
        </MenuText>
      </LeftDivisionView>
      <RightDivisionView>
        {renderingTest}
        {/* 아래는 원래 오리지날 before convering to RenderingTest */}
        {/* {isEdit ? (
          <InputData setState={setState} />
        ) : (
          <MenuText
            color={ValueText.color || 'white'}
            size={ValueText.size || '14px'}
            textAlign={ValueText.textAlign || 'center'}>
            {ValueText.value}
          </MenuText>
        )} */}
      </RightDivisionView>
    </TextContainer>
  );
};

const TextContainer = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: flex-end;
  margin: 0px 35px;
`;

const LeftDivisionView = styled.View`
  flex: 4;
  /* border: 1px;
  border-color: white; */
`;
const RightDivisionView = styled.View`
  flex: 6;
  /* border: 1px;
  border-color: white; */
`;
export default InfoTextRow;
