import React from 'react';
import loading from '../../../images/icons/loading-process.png';
import './style.css';
const LoadingProcess = () => {
  return (
    <div className="loader">
      <img src={loading} alt="" />
    </div>
  );
};

export default LoadingProcess;
