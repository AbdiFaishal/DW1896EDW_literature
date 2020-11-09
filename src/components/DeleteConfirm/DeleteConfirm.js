import React from 'react';
import ConfirmModal from '../commons/ConfirmModal/ConfirmModal';
import Checkmark from '../commons/Checkmark/Checkmark';
import LoadingBall from './../commons/LoadingBall/LoadingBall';

const DeleteConfirm = ({
  handleSubmit,
  loading,
  message,
  setConfirmModal,
  collectionId,
  deleteCollection,
  loadingDelete,
}) => {
  return (
    <div className="modal-parent">
      <div
        className="modal-background "
        onClick={() => setConfirmModal(false)}
      />
      {loadingDelete ? (
        <ConfirmModal>
          <LoadingBall />
        </ConfirmModal>
      ) : message ? (
        <ConfirmModal>
          <Checkmark message={message} />
        </ConfirmModal>
      ) : (
        <ConfirmModal>
          <h1>Delete Confirmation</h1>
          <p>
            Are you sure want to <strong>remove</strong> this collection?
          </p>
          <div className="btn-group-confirm">
            <button className="btn" onClick={() => setConfirmModal(false)}>
              No
            </button>
            <button
              className="btn"
              onClick={() => deleteCollection(collectionId)}
            >
              Yes
            </button>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default DeleteConfirm;
