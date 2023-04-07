import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    selectedTags: [] as Array<string>,
  },
  reducers: {
    // action methods
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
  },
});

export const { setSelectedTags } = filterSlice.actions;

export const selectTags = (state: RootState) => state.filter;

export default filterSlice.reducer;
