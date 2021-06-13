/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ListItem} from '@ui-kitten/components';
import React, {useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelectedPatient} from '~/hooks/useReduce';

export type PatientListItemProps = {
  item: any;
  setModalVisible: (active: boolean) => void;
};

const renderItemIcon = () => (
  <Icon name="person" size={25} color={'#0E76FF'} style={styles.Icon} />
);

const PatientListItem = ({item, setModalVisible}: PatientListItemProps) => {
  // console.log(item);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  const onListItemPress = (item: any) => {
    setModalVisible(true);
    setPatientReducer(item);
    // console.log(item);
  };

  return (
    <ListItem
      onPress={() => onListItemPress(item)}
      title={evaProps => (
        <View style={{marginBottom: 5}}>
          <Text {...evaProps}>{item.name}</Text>
        </View>
      )}
      description={evaProps => <Text {...evaProps}>{item.description}</Text>}
      accessoryLeft={renderItemIcon}
      style={styles.listItem}
    />
  );
};

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