import React from 'react';
import Switch from '../switch';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
      <header className="mw-header">
        <img src={logo} className="mw-header__logo" alt="logo" />
        <Switch />
      </header>
  );
};

export default Header;
