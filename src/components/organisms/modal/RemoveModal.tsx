/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Button, Card, Modal} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MenuText} from '~/components/atoms/Text';
import ModalOneMenuRow from '~/components/molecules/ModalOneMenuRow';
import {useSelectedPatient} from '~/hooks/useReduce';