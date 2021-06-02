/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ListItem} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const renderItemIcon = () => (
  <Icon
    name="person"
    size={25}
    color={'#0E76FF'}
    style={styles.Icon}
  />
);

const PatientListItem = ({
  item,
  index,
}: {
  item: any;
  index?: any;
}) => (
  <ListItem
    title={evaProps => (
      <View style={{marginBottom: 5}}>
        <Text {...evaProps}>{item.title}</Text>
      </View>
    )}
    description={evaProps => (
      <Text {...evaProps}>{item.description}</Text>
    )}
    accessoryLeft={renderItemIcon}
    style={styles.listItem}
  />
);

const styles = StyleSheet.create({
  listItem: {
    // borderWidth: 1,
  },
  Icon: {
    marginTop: -20,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
  },
});

export default PatientListItem;
