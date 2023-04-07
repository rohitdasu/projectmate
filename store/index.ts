import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/sliceModal';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

/* sharing the types to be configured in the global dispatch and selector hooks in @/hooks */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
