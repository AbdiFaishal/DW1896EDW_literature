import React from 'react';
import './style.css';
import logo from '../../images/Logo/logo.svg';
import { useHistory } from 'react-router-dom';

const Logo = () => {
  const history = useHistory();
  const moveToHome = () => {
    history.push('/search');
  };
  return (
    <div className="logo" onClick={moveToHome}>
      <p>literature</p>
      <img src={logo} alt="" />
    </div>
  );
};

export default Logo;
