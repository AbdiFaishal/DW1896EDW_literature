import React from 'react';
import ConfirmModal from './../commons/ConfirmModal/ConfirmModal';
import LoadingSpinner from './../commons/LoadingSpinner/LoadingSpinner';
import Checkmark from './../commons/Checkmark/Checkmark';
// import Crossmark from './../commons/Crossmark/Crossmark';

const AdminConfirm = ({
  setModalOpen,
  handleSubmit,
  loading,
  message,
  choice,
  bookId,
}) => {
  return (
    <div className="modal-parent">
      <div
        className="modal-background modal-background-admin"
        onClick={() => setModalOpen(false)}
      />
      {loading ? (
        <ConfirmModal>
          <LoadingSpinner />
        </ConfirmModal>
      ) : message ? (
        <ConfirmModal>
          <Checkmark message={message} />
        </ConfirmModal>
      ) : (
        <ConfirmModal>
          <h1>Book Verification</h1>
          <p>
            Are you sure want to <strong className="strong">{choice}</strong>{' '}
            this book?
          </p>
          <div className="btn-group-confirm">
            <button className="btn" onClick={() => setModalOpen(false)}>
              No
            </button>
            <button className="btn" onClick={() => handleSubmit(bookId)}>
              Yes
            </button>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default AdminConfirm;
