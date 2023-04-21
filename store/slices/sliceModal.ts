import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
  },
  reducers: {
    // action methods
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
