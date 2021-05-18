/* eslint-disable prettier/prettier */
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/modules';
import {setUser} from '~/modules/user/user';

//이 형태 참조: velog-client-master
export const useSetUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector(
    (state: RootState) => state.user,
  );

  const setUserReducer = useCallback(
    (params: registrySubmitParamList) => {
      dispatch(setUser(params));
    },
    [dispatch],
  );

  return [userState, setUserReducer] as [
    typeof userState,
    typeof setUserReducer,
  ];
};
