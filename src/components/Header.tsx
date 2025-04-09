import logo from '../assets/svg/cointrend-high-resolution-logo-transparent.svg';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <header className="container">
      <div className="header">
        <Link to={'/'}><img className='logo' src={logo} alt="logo" /></Link>
        <Link to={'/portfolio'}><Wallet size={34} className='portfolio-logo'/></Link>
      </div>
    </header>
  )
}
