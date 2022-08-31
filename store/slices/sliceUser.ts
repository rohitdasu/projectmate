import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface UserType {
  isLogged: boolean;
}

const initialState: UserType = {
  isLogged: false,
};

export const userLoggedSlice = createSlice({
  name: 'isLogged',
  initialState,
  reducers: {
    setUserLogged: (state) => {
      state.isLogged = true;
    },
    setUserLoggedOut: (state) => {
      state.isLogged = false;
    },
  },
});

export const { setUserLogged, setUserLoggedOut } = userLoggedSlice.actions;

export const selectuserLogged = (state: RootState) => state.user;

export default userLoggedSlice.reducer;
