import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TickerState {
  symbol: string;
  price: string;
  movement: string;
  quoteVolume: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  numberOfTrades: string;
}

interface InitialState {
  tickers: TickerState[];
  findTicker: string; 
  findedTickers: TickerState[];

}
const initialState: InitialState = {
  tickers: [],
  findTicker: '',
  findedTickers: [],
  
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    updateTicker(state, action: PayloadAction<TickerState>) {
      const { 
        symbol, price, movement, quoteVolume, highPrice, lowPrice, volume, numberOfTrades
      } = action.payload;
      const baseSymbol = symbol.slice(0, -4);

      const existing = state.tickers.find(item => item.symbol === baseSymbol);
      if (existing) {
        existing.price = price;
        existing.movement = movement;
        existing.quoteVolume = quoteVolume;
      } else {
        state.tickers.push({
          symbol: baseSymbol,
          price,
          movement,
          quoteVolume,
          highPrice,
          lowPrice,
          volume,
          numberOfTrades,
        });
      }

      state.tickers.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    },
    
    setFindTicket(state, action: PayloadAction<string>){
      state.findTicker = action.payload;
      state.findedTickers = state.tickers.filter(s => s.symbol.toLowerCase().includes(state.findTicker) )
    }
  }
});

export const selectTicker = (state: RootState) => state.ticker;
export const { updateTicker, setFindTicket } = tickerSlice.actions;
export default tickerSlice.reducer;
