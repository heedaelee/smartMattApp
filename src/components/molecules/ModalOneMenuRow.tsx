/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {MenuText} from '~/components/atoms/Text';

type ModalOneMenuRowProps = {
  textColor?: string;
  onPress: () => void;
  children: string;
};

const ModalOneMenuRow = ({textColor, onPress, children}: ModalOneMenuRowProps) => {
  return (
    <TouchableHighlight
      underlayColor="#f2f1f139"
      activeOpacity={0.1}
      onPress={() => onPress()}
      style={styles.ModalMenuRow}>
      <MenuText style={{color: textColor ? textColor : 'black'}} textAlign={'left'}>
        {children}
      </MenuText>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  ModalMenuRow: {
    flexDirection: 'row',
    // borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
});

export default ModalOneMenuRow;
