import React from 'react';

const PopupSuccess = ({ setPopupOpen, message }) => {
  return (
    <div className="modal-parent">
      <div
        onClick={() => setPopupOpen(false)}
        className="modal-background"
      ></div>
      <div className="popup-success">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupSuccess;
