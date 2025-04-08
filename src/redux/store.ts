import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from './slices/tickerSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
