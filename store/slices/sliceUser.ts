import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface UserLogged {
  userLogged: boolean;
}

const initialState: UserLogged = {
  userLogged: false,
};

export const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    openuserLogged: (state) => {
      state.userLogged = true;
    },
    closeuserLogged: (state) => {
      state.userLogged = false;
    },
  },
});

export const { openuserLogged, closeuserLogged } = userLoggedSlice.actions;

export const selectuserLogged = (state: RootState) => state.user;

export default userLoggedSlice.reducer;
