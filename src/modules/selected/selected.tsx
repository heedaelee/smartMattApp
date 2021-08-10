/* eslint-disable prettier/prettier */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export type SelectedPatient = {
//   id: string;
//   name: string;
//   description?: string;
// };

export const initialState: SelectedPatientState = {
  id: '',
  patientName: '',
  patientCondition: '',
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelectedPatient(state, action) {
      state.id = action.payload.id;
      state.patientName = action.payload.patientName;
      state.patientCondition = action.payload.patientCondition;
    },
  },
});

export const {setSelectedPatient} = selectedSlice.actions;
export default selectedSlice.reducer;
