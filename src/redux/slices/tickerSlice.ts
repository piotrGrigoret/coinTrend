import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface TickerState {
    [symbol: string]: string; 
}


const initialState: TickerState = {};



const tickerSlice = createSlice({
    name: 'ticker',
    initialState,
    reducers:{
        updateTicker(state, action: PayloadAction<{symbol: string; price: string}>){
            const {symbol, price} = action.payload;
            state[symbol] = price;
        }
    }
})

export const {updateTicker} = tickerSlice.actions;
export default tickerSlice.reducer;


  
