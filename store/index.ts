import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/sliceModal';
import filterReducer from './slices/sliceFilter';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filter: filterReducer,
  },
});

/* sharing the types to be configured in the global dispatch and selector hooks in @/hooks */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
