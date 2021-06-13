/* eslint-disable prettier/prettier */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export type SelectedPatient = {
//   id: string;
//   name: string;
//   description?: string;
// };

export const initialState: SelectedPatientState = {
  id: '',
  name: '',
  description: '',
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedPatient(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
  },
});

export const {setSelectedPatient} = selectedSlice.actions;
export default selectedSlice.reducer;
