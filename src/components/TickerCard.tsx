import { Coins } from 'lucide-react';
import { useState } from 'react';
import { NestedModal } from './NestedModal';
interface TickerCardProps {
    symbol: string;
    price: string;
    movement: string;
    quoteVolume: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    numberOfTrades: string;
}

export const TickerCard: React.FC<TickerCardProps> = ({ 
    symbol, price, movement, quoteVolume, highPrice, lowPrice, volume, numberOfTrades 
}) => {
    const [openModal, setOpenModal] = useState(false);

  return (
    
    <div className='ticker-card' onClick={() => setOpenModal(prev => !prev)}>
        <p><Coins className='card-img' size={54}/></p>
        <div>
            <h3>{symbol}</h3>
            <h5>{price} <span>$</span></h5>
            <h6 className={movement[0] === '-' ? 'move-red' : 'move-green'}>
                {movement[0] !== '-' && <span>+</span>}
                {movement}
            </h6>
        </div>
        <NestedModal 
            openModal={openModal} 
            onClose={() => setOpenModal(false)}
            symbol = {symbol}  
            price = {price}
            movement = {movement}
            quoteVolume = {quoteVolume}
            highPrice = {highPrice}
            lowPrice = {lowPrice}
            volume = {volume}
            numberOfTrades = {numberOfTrades}
        />
    </div>
  );
};
