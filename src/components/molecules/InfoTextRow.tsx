/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {MenuText} from '../atoms/Text';

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
};

const InfoTextRow = ({
  TypeText,
  ValueText,
}: InfoTextRowProps) => {
  return (
    <TextContainer>
      <DivisionView>
        <MenuText
          color={TypeText.color || 'white'}
          size={TypeText.size || '22px'}
          textAlign={TypeText.textAlign || 'left'}>
          {TypeText.value}
        </MenuText>
      </DivisionView>
      <DivisionView>
        <MenuText
          color={ValueText.color || 'white'}
          size={ValueText.size || '14px'}
          textAlign={ValueText.textAlign || 'center'}>
          {ValueText.value}
        </MenuText>
      </DivisionView>
    </TextContainer>
  );
};

const TextContainer = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: center;
  margin: 0px 40px;
`;

const DivisionView = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
`;
export default InfoTextRow;
