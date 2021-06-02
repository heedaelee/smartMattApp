/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {List} from '@ui-kitten/components';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CircleButton} from '~/components/atoms/Button';
import {Container} from '~/components/atoms/Container';
import PatientListItem from '~/components/molecules/PatientListItem';
import {PatientListDummy} from '~/lib/dummyData/DummyData';

type PatientListProps = {
  navigation: StackNavigationProp<HomeStackNaviParamList>;
};

const PatientList = ({navigation}: PatientListProps) => {
  const goToAddPatientPage = () => {
    console.log('test');
    navigation.navigate('AddPatient');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container}>
        <List
          style={styles.list}
          data={PatientListDummy}
          renderItem={PatientListItem}
          scrollEnabled={true}
        />
        <CircleButton onPress={goToAddPatientPage}>
          +
        </CircleButton>
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

export default PatientList;
