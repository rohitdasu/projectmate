import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/sliceModal';
import modeReducer from './slices/sliceMode';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
