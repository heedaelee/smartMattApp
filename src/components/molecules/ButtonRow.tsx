/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../atoms/Button';

type ButtonRowProps = {
  // LeftButton: {};
  // RightButton: {};
};

const ButtonRow = ({}: ButtonRowProps) => {
  return (
    <ButtonContainer>
      <DivisionView style={{marginRight: 2.5}}>
        <Button round={true}>수정하기</Button>
      </DivisionView>
      <DivisionView style={{marginLeft: 2.5}}>
        <Button round={true}>확인</Button>
      </DivisionView>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
  flex-direction: row;
  align-items: center;
`;
const DivisionView = styled.View`
  flex: 1;
  /* border: 1px;
  border-color: white; */
`;

export default ButtonRow;
