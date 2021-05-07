/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import styled from 'styled-components/native';

type MenuTextProps = {
  children?: any;
  color?: string;
  size?: string;
  textAlign?: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

export const MenuText = ({
  children,
  color,
  size,
  textAlign,
  style,
  onPress,
}: MenuTextProps) => {
  return (
    <MenuTextStyled
      onPress={onPress}
      style={style}
      color={color}
      size={size}
      textAlign={textAlign}>
      {children}
    </MenuTextStyled>
  );
};

const MenuTextStyled = styled.Text`
  color: ${(props: MenuTextProps) =>
    props.color || 'black'};
  font-size: ${(props: MenuTextProps) =>
    props.size || '16px'};
  font-family: 'SpoqaHanSansNeo-Medium';
  text-align: ${(props: MenuTextProps) =>
    props.textAlign || 'center'};
`;

type ErrorTextProps = {
  children?: any;
  color?: string;
  size?: string;
  style?: StyleProp<TextStyle>;
};

export const ErrorText = ({
  children,
  color,
  size,
  style,
}: ErrorTextProps) => {
  return (
    <ErrorTextStyled
      color={color}
      size={size}
      style={style}>
      {children}
    </ErrorTextStyled>
  );
};

const ErrorTextStyled = styled.Text`
  position: absolute;
  top: 58px;
  color: ${(props: MenuTextProps) =>
    props.color || '#faa1a1'};
  font-size: ${(props: MenuTextProps) =>
    props.size || '14px'};
  font-family: 'SpoqaHanSansNeo-Medium';
`;
