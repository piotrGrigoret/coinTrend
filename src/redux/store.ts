import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from './slices/tickerSlice';
import { binanceMiddleware } from './middleware/binanceMiddleware';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(binanceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
