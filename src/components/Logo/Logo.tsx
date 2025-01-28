import { Link } from 'react-router-dom';
import LogoIcon from '../../images/icons/Logo.svg?react';
// import logoIcon from '../../images/icons/Logo.svg';
import './Logo.scss';

export const Logo = () => (
  <Link to="/home">
    <LogoIcon className="logo" />
    {/* <img
      src={logoIcon}
      alt="Logo"
      className="Logo"
    /> */}
  </Link>
);
