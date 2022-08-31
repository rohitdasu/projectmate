import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import modeReducer from './slices/ModeSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    mode: modeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
