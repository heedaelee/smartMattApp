/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ListItem} from '@ui-kitten/components';
import React, {useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelectedPatient} from '~/hooks/useReduce';

export type NormalListItemProps = {
  item: AlarmItem;
  setModalVisible?: (active: boolean) => void;
  setRead?: (item: AlarmItem) => void;
};

const renderItemIcon = () => (
  <Icon name="person" size={25} color={'#0E76FF'} style={styles.Icon} />
);

const NormalListItem = ({item, setModalVisible, setRead}: NormalListItemProps) => {
  // console.log(item);
  const [selectedPatientState, setPatientReducer] = useSelectedPatient();

  const onListItemPress = setModalVisible
    ? (item: any) => {
        setModalVisible(true);
        setPatientReducer(item);
        // console.log(item);
      }
    : setRead
    ? (item: any) => {
        setRead(item);
      }
    : () => {};

  return (
    <ListItem
      onPress={() => onListItemPress(item)}
      title={evaProps => (
        <View style={{marginBottom: 5}}>
          {item.isRead ? (
            <Text style={{opacity: 0.5}}>{item.title}</Text>
          ) : (
            <Text>{item.title}</Text>
          )}
        </View>
      )}
      description={evaProps =>
        item.isRead ? (
          <Text {...evaProps} style={[evaProps?.style, {opacity: 0.8}]}>
            {item.description}
          </Text>
        ) : (
          <Text {...evaProps} style={[evaProps?.style]}>
            {item.description}
          </Text>
        )
      }
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

export default NormalListItem;
