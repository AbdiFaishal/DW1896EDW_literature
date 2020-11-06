import React from 'react';
import Checkmark from '../commons/Checkmark/Checkmark';
import ConfirmModal from './../commons/ConfirmModal/ConfirmModal';
import LoadingSpinner from './../commons/LoadingSpinner/LoadingSpinner';
import Crossmark from './../commons/Crossmark/Crossmark';

const UploadAvatar = ({
  handleCloseModal,
  handleSubmit,
  uploadLoading,
  message,
}) => {
  return (
    <div className="modal-parent">
      <div className="modal-background" onClick={handleCloseModal} />
      {uploadLoading ? (
        <ConfirmModal>
          <LoadingSpinner />
        </ConfirmModal>
      ) : message ? (
        <ConfirmModal>
          {message === 'Upload Success' ? <Checkmark /> : <Crossmark />}
        </ConfirmModal>
      ) : (
        <ConfirmModal>
          <h1>Upload Photo Profile</h1>
          <p>Are you sure want to change your photo profile?</p>
          <div className="btn-group-confirm">
            <button className="btn" onClick={handleCloseModal}>
              No
            </button>
            <button className="btn" onClick={handleSubmit}>
              Yes
            </button>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default UploadAvatar;
