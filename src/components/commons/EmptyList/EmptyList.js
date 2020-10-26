import React from 'react';
import sadicon from '../../../images/icons/sad-icon.png';
import './style.css';

const EmptyList = ({ text }) => {
  return (
    <div className="empty-book-list">
      <p>{text}</p>
      <img src={sadicon} alt="sad icon" />
    </div>
  );
};

export default EmptyList;
