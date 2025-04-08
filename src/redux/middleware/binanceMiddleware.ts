import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { updateTicker } from '../slices/tickerSlice';

const symbols = ['btcusdt', 'ethusdt', 'bnbusdt'];
const streamUrl = `wss://stream.binance.com:9443/stream?streams=${symbols
  .map(s => `${s}@ticker`)
  .join('/')}`;

export const binanceMiddleware: Middleware = store => {
  let socket: WebSocket;

  return next => action => {
    if ((action as AnyAction).type === 'app/startWebSocket') {
      socket = new WebSocket(streamUrl);

      socket.onmessage = event => {
        const message = JSON.parse(event.data);
        const { s: symbol, c: price } = message.data;
        store.dispatch(updateTicker({ symbol, price }));
      };

      socket.onerror = err => {
        console.error('[WebSocket Error]', err);
      };

      socket.onclose = () => {
        console.log('[WebSocket Closed]');
      };
    }

    return next(action);
  };
};
