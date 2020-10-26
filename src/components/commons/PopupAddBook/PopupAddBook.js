import React from 'react';

const PopupAddBook = (props) => {
  const closeModal = () => {
    console.log('click close');
    props.setPopupOpen(false);
    props.setTextError(null);
  };

  console.log('props: ', props);

  // console.log('setTextError: ', setTextError);
  return (
    <div className="modal-parent">
      <div onClick={closeModal} className="modal-background"></div>
      <div className="popup-addbook">
        <p>
          {props.textError
            ? props.textError
            : 'Thank you for adding your own literature to our website, please wait 1 x 24 hours to verify whether this literature is your writing'}
        </p>
      </div>
    </div>
  );
};

export default PopupAddBook;
