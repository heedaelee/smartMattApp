/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '~/components/atoms/Container';
import Theme from '~/lib/Theme';
import {View} from 'react-native';
import {
  Avatar,
  ListItem,
  List,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Fontisto';
import {CircleButton} from '~/components/atoms/Button';

const _WIDTH = Theme._WIDTH;
const _HEIGHT = Theme._HEIGHT;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '김인하',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '이철수',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Json',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Json',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Json',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Json',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Json',
    description:
      '자동차 사고로 인한 요추 골절상, 등 상부 부분 움직임 가능',
  },
];

const renderItemIcon = (props: any) => (
  <Icon
    name="person"
    size={25}
    color={'#0E76FF'}
    style={styles.Icon}
  />
);

const KittenListItem = ({
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
const PatientListTemplate = ({}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container}>
        <List
          style={styles.list}
          data={DATA}
          renderItem={KittenListItem}
          scrollEnabled={true}
        />
        <CircleButton>+</CircleButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

/* border: 1px;
  border-color: gray; */

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  list: {
    // borderWidth: 1,
    maxHeight: 438,
    width: '100%',
  },
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

export default PatientListTemplate;
