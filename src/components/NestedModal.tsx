// NestedModal.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircleX } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Coins } from 'lucide-react';

import HistoricalChart from './HistoricalChart';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#342d2d',
  border: '2px solid #3d9970',
  boxShadow: 24,
  borderRadius:3,
  width:{xs:"80vw", sm:"80vw", md:"90vw"},
  height:{xs:"60vh", sm:"60vh", md:"90vh"},
  overflow: 'auto',
  pt: 2,
  px: 4,
  pb: 3,
};


interface NestedModalProps {
  openModal: boolean;
  onClose: () => void;
  symbol: string;
  price: string;
  movement: string;
  quoteVolume: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  numberOfTrades: string;
}

interface ChildModalProps {
  symbol: string;
  price: string;
  movement: string;
}
export interface PortfolioCoin {
  symbol: string;
  price: string;
  movement: string;
  num: number;
}


export const ChildModal: React.FC<ChildModalProps> = ({
  symbol, price, movement
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('0');

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    const num = parseFloat(value);
    const isValid = !isNaN(num) && num > 0 && num <= 1000;
    if (isValid) {
      handleClose(); 
      addCoinToStorage(num);
    } 
  };


  const addCoinToStorage = (num: number) => {
    if (!localStorage.getItem('portfolioCoins')) {
      localStorage.setItem('portfolioCoins', JSON.stringify([]));
    }
    const portfolioCoin = {
      symbol, price, movement, num
    }
    const storedCoins = localStorage.getItem('portfolioCoins');
    const coinsArray = storedCoins ? JSON.parse(storedCoins) : [];
    const isRepeat = coinsArray.map((c:PortfolioCoin) => c.symbol).includes(portfolioCoin.symbol);
    if(!isRepeat){
      coinsArray.push(portfolioCoin);
      localStorage.setItem('portfolioCoins', JSON.stringify(coinsArray));

    }else{ 
      const newCoinsArray = coinsArray.map((c:PortfolioCoin) => {
        if(c.symbol === portfolioCoin.symbol){ 
          return {
            ...c,
            num: c.num + portfolioCoin.num
          } 
        }
        return c
      })
      localStorage.setItem('portfolioCoins', JSON.stringify(newCoinsArray));
    }
  
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div  className='add-button-container'>
          <button onClick={handleOpen} className="add-button">
          <Wallet className="add-button__icon" />
          <div>ADD</div>
          </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, height:210, width: 270, padding:2 }}>
          <CircleX  className='modal-circle'  onClick={handleClose} />

          <h3 id="child-modal-title">How much do you want to add to your portfolio?</h3>
          
          <form className="coin-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="number"
                className="input"
                placeholder="Coin amount"
                min={1}
                max={1000}
                onChange={(e) => setValue(e.target.value)}
              />
              <Coins className="input-icon" />
            </div>
            <div  className='add-button-container'>
              <button className="add-button" type="submit">
                <Wallet className="add-button__icon" />
                <div>ADD</div>
              </button>
            </div>
          </form>
        
        </Box>
      </Modal>
    </React.Fragment>
  );
}






export const NestedModal: React.FC<NestedModalProps> = ({ 
  openModal, onClose,  symbol, price, movement, quoteVolume, highPrice, lowPrice, volume, numberOfTrades
}) => {
  return (
    <Modal
      open={openModal}
      onClose={onClose} 
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      closeAfterTransition
      slots={{ backdrop: "div" }}
    >
    <Box
      sx={{ ...style }}
      onClick={(e) => e.stopPropagation()} 

    >
      <CircleX className='modal-circle' onClick={onClose} />
      <div className='isMobileInModal'>
        <HistoricalChart
          symbol = {symbol}
        />
      </div>
      <div className='modal-data'>
        <div>price: {parseFloat(price).toFixed(1)}$</div>
        <div>movement: 
          <span className={movement[0] === '-' ? 'move-red' : 'move-green'}>
              {movement}
          </span>
        </div>
        <div>high price: {highPrice}$</div>
        <div>low price: {lowPrice}</div>
        <div>volume: {volume}</div>
        <div>number of trades: {numberOfTrades}</div>
        <div>quote volume: {parseFloat(quoteVolume).toFixed(1)}</div>
      </div>
      <ChildModal
        symbol ={symbol} 
        price ={price} 
        movement = {movement} 
      />

    </Box>
  </Modal>
  
  );
};

export default NestedModal;
