import { Middleware } from '@reduxjs/toolkit';
import { updateTicker } from '../slices/tickerSlice'; 

const symbols = [
  'btcusdt', 'ethusdt', 'bnbusdt', 'adausdt', 'solusdt', 'dogeusdt', 'xrpusdt', 'linkusdt', 'ltcusdt', 'polkadotusdt',
  'maticusdt', 'avaxusdt', 'shibusdt', 'lunausdt', 'axsusdt', 'xemusdt', 'algousdt', 'uniswapusdt', 'ftmusdt', 'cosmosusdt',
  'vechainusdt', 'kusamausdt', 'zrxusdt', 'thetatokenusdt', 'aaveusdt', 'sushiusdt', 'sandusdt', 'paxgusdt', 'btcethusdt',
  'suiusdt', 'trxusdt', 'arbitrumusdt', 'bttusdt', 'ftmusdt', 'nearusdt', 'xlmusdt', 'linkusdt', 'stmxusdt', 'cardanousdt',
  'chzusdt', 'solusdt', 'xrpusdt', 'ltcusdt', 'ethusdt', 'solusdt', 'lunausdt', 'bchusdt', 'dogeusdt', 'dashusdt',
  'shibusdt', 'usdtusdt', 'busdusdt', 'usdcusdt', 'xemusdt', 'polkadotusdt', 'mkrusdt', 'uniswapusdt', 'aaveusdt',
  'compusdt', 'linkusdt', 'paxgusdt', 'eosusdt', 'makerusdt', 'bttusdt', 'maticusdt', 'ftmusdt', 'crvusdt', 'celusdt'
];



const streamUrl = `wss://stream.binance.com:9443/stream?streams=${symbols
  .map(s => `${s}@ticker`)  
  .join('/')}`;

export const binanceMiddleware: Middleware = store => {
  let socket: WebSocket;

  return next => action => {
    if (action && typeof action === 'object' && 'type' in action) {
      if (action.type === 'app/startWebSocket') {
        socket = new WebSocket(streamUrl);

        socket.onmessage = event => {
          const message = JSON.parse(event.data);

          const { 
            s: symbol, c: price, p: movement, q: quoteVolume, h:highPrice, l:lowPrice, v: volume,
            n: numberOfTrades 

          } = message.data;
          store.dispatch(updateTicker({ 
            symbol, price, movement, quoteVolume, highPrice, lowPrice, volume, numberOfTrades
          }));
        };

        socket.onerror = err => {
          console.error('[WebSocket Error]', err);
        };

        socket.onclose = () => {
          console.log('[WebSocket Closed]');
        };
      }
    }

    return next(action);
  };
};
