/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

type ContainerProps = {
  children?: any;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({
  children,
  color,
  style,
}: ContainerProps) => {
  return (
    <ContainerWrapper style={style} color={color}>
      {children}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props: ContainerProps) =>
    props.color || 'white'};
  padding: 5% 7% 3% 7%;
`;
