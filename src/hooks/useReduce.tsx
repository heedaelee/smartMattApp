/* eslint-disable prettier/prettier */
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/modules';
import {setSelectedPatient} from '~/modules/selected/selected';
import {setUser} from '~/modules/user/user';

//이 형태 참조: velog-client-master
export const useLoggedUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const setUserReducer = useCallback(
    (params: registrySubmitParamList) => {
      dispatch(setUser(params));
    },
    [dispatch],
  );

  return [userState, setUserReducer] as [typeof userState, typeof setUserReducer];
};

export const useSelectedPatient = () => {
  const dispatch = useDispatch();
  const selectedPatientState = useSelector((state: RootState) => state.selectedPatient);
  const setPatientReducer = useCallback(
    (params: SelectedPatientState) => {
      dispatch(setSelectedPatient(params));
    },
    [dispatch],
  );

  return [selectedPatientState, setPatientReducer] as [
    typeof selectedPatientState,
    typeof setPatientReducer,
  ];
};
