import React from 'react';
import CardCollection from './../CardCollection.js/CardCollection';

const CollectionList = ({
  state,
  setConfirmModal,
  setCollectionId,
  setMessage,
}) => {
  return (
    <div className="book-cards">
      {state.collections.map((book) => {
        return (
          <CardCollection
            key={book.id}
            {...book}
            setConfirmModal={setConfirmModal}
            setCollectionId={setCollectionId}
            setMessage={setMessage}
          />
        );
      })}
    </div>
  );
};

export default CollectionList;
