import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/sliceModal';
import modeReducer from './slices/sliceMode';
import userReducer from './slices/sliceUser';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    mode: modeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
