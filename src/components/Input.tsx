import { Coins } from 'lucide-react';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setFindTicket } from '../redux/slices/tickerSlice';


export const Input = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFindTicket((e.target.value.toLowerCase())));
  };
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          placeholder="Coin name"
          onChange={handleChangeInput}
        />
        <Coins className="input-icon"  />
      </div>
    </div>
  );
};
