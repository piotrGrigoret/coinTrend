import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { TickerCard } from './TickerCard';
import { SkeletonTable } from './SkeletonTable';
import { RootState } from '../redux/store';
import notFound from "../assets/svg/404.svg"


export const TickersList = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const tickers = useSelector((state: RootState) => state.ticker.tickers);
  const findedTickers = useSelector((state: RootState) => state.ticker.findedTickers);
  const findTickers = useSelector((state: RootState) => state.ticker.findTicker);
  useEffect(() => {
    dispatch({ type: 'app/startWebSocket' }); 
    return () => {
      const socket = new WebSocket('wss://stream.binance.com:9443/stream?streams='); 
      socket.close();
    };
  }, [dispatch]);


  if(tickers.length < 1){ 
      return(
        <SkeletonTable/>
      )
  }

  if(findTickers.length > 0 && findedTickers.length > 0){
   return(
   <div className='ticker-list'>
        {findedTickers.map((t)=>(
          <TickerCard    
              key={t.symbol}          
              symbol={t.symbol}
              price={parseFloat(t.price).toString()}
              movement={parseFloat(t.movement).toString()}
              quoteVolume = {parseFloat(t.quoteVolume).toString()}
              highPrice = {parseFloat(t.highPrice).toString()}
              lowPrice = {parseFloat(t.lowPrice).toString()}
              volume = {parseFloat(t.volume).toString()}
              numberOfTrades = {parseFloat(t.numberOfTrades).toString()}
          />
        ))}
    </div>
    )
  }

  if(findTickers.length > 0 && findedTickers.length === 0){
   return(
   <div className='error'>
      <img className="notFound-img" src={notFound} alt="not found" />
      There is no such token in the list
    </div>
    )
  }
  return (
    <div className='ticker-list'>
        {tickers.map((t)=>(
          <TickerCard    
            key={t.symbol}          
            symbol={t.symbol}
            price={parseFloat(t.price).toString()}
            movement={parseFloat(t.movement).toString()}
            quoteVolume = {parseFloat(t.quoteVolume).toString()}
            highPrice = {parseFloat(t.highPrice).toString()}
            lowPrice = {parseFloat(t.lowPrice).toString()}
            volume = {parseFloat(t.volume).toString()}
            numberOfTrades = {parseFloat(t.numberOfTrades).toString()}
          />
        ))}
    </div>
  )
}
