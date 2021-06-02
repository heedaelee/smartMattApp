/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '~/components/atoms/Container';
import InfoTextRow from '~/components/molecules/InfoTextRow';
import Theme from '~/lib/Theme';

const _WIDTH = Theme._WIDTH;
const _HEIGHT = Theme._HEIGHT;

const HeatMapTemplate = ({}) => {
  return <Text>HeatMapTemplate page</Text>;
};

export default HeatMapTemplate;
