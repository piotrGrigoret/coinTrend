import { Coins } from 'lucide-react';

export const Input = () => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          placeholder="Coin name"
        />
        <Coins className="input-icon" />
      </div>
    </div>
  );
};
