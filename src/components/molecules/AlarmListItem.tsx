/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {ListItem} from '@ui-kitten/components';
import React, {useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelectedPatient} from '~/hooks/useReduce';
import Theme from '~/lib/Theme';

export type AlarmListItemProps = {
  item: AlarmListItem;
  setModalVisible?: (active: boolean) => void;
  setRead?: (item: nomalListItem) => void;
};

const renderItemIcon = () => (
  <Icon name="person" size={25} color={'#0E76FF'} style={styles.Icon} />
);

const AlarmListItem = ({item, setModalVisible, setRead}: AlarmListItemProps) => {
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
        <View style={{marginBottom: 5, marginLeft:5}}>
          {item.isRead ? (
            <Text style={styles.isRead}>{item.message}</Text>
          ) : (
            <Text>{item.message}</Text>
          )}
        </View>
      )}
      description={evaProps =>
        item.isRead ? (
          <Text
            {...evaProps}
            style={[evaProps?.style, {...styles.isRead, ...styles.reg_dttm}]}>
            {item.reg_dttm}
          </Text>
        ) : (
          <Text {...evaProps} style={[evaProps?.style, styles.reg_dttm]}>
            {item.reg_dttm}
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
    // height: 80,
    // width: 300,
    // borderWidth: 1,
  },
  isRead: {
    opacity: 0.7,
  },
  reg_dttm: {
    // borderWidth: 1,
    marginLeft: 5,
  },
  Icon: {
    marginTop: -20,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
  },
});

export default AlarmListItem;
