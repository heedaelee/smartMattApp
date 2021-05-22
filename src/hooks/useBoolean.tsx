/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useCallback} from 'react';

const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(
    (active: boolean) => setValue(active),
    [],
  );

  return [value, toggle] as [typeof value, typeof toggle];
};

export default useBoolean;
