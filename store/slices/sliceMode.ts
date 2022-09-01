import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface Mode {
  mode: boolean;
}

const initialState: Mode = {
  mode: false,
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const { changeMode } = modeSlice.actions;

export const selectMode = (state: RootState) => state.mode;

export default modeSlice.reducer;
