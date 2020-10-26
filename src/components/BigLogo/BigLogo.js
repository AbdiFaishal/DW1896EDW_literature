import React from 'react';
import './style.css';
import logo from '../../images/Logo/big-logo.png';

const BigLogo = () => {
  return (
    <div className="big-logo">
      <img src={logo} alt="" />
    </div>
  );
};

export default BigLogo;
