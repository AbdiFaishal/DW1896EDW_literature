import React, { useContext, useEffect, useState } from 'react';
import Navbar from './../../components/Navbar/Navbar';
import { API } from './../../config/api';
import { CollectionContext } from './../../context/collectionContext';
import CollectionList from './../../components/CollectionList/CollectionList';
import EmptyList from './../../components/commons/EmptyList/EmptyList';
import { UserContext } from './../../context/userContext';
import LoadingSpinner from '../../components/commons/LoadingSpinner/LoadingSpinner';
import DeleteConfirm from '../../components/DeleteConfirm/DeleteConfirm';

const MyCollection = () => {
  const { state: userState } = useContext(UserContext);
  const { state, dispatch } = useContext(CollectionContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [collectionId, setCollectionId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteCollection = async (literatureId) => {
    try {
      setLoadingDelete(true);
      setMessage('');
      const res = await API.delete(`delete-collection/${literatureId}`);
      // console.log('res: ', res);
      setLoadingDelete(false);
      setMessage(res.data.message);

      getCollections();
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/collection/${userState.user.id}`);
      dispatch({
        type: 'GET_COLLECTIONS',
        payload: res.data.data,
      });
      // console.log('res: ', res);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      dispatch({
        type: 'EMPTY_COLLECTIONS',
      });
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  return (
    <div className="container">
      <Navbar />
      <div className="my-collection-page">
        <h1>My Collection</h1>
        <div>
          {loading ? (
            <div className="loading-profile-literature">
              <LoadingSpinner />
            </div>
          ) : !state.collections.length ? (
            <EmptyList text={"Looks like you don't have any collections yet"} />
          ) : (
            <CollectionList
              state={state}
              setConfirmModal={setConfirmModal}
              setCollectionId={setCollectionId}
              setMessage={setMessage}
            />
          )}
          {confirmModal && (
            <DeleteConfirm
              setConfirmModal={setConfirmModal}
              collectionId={collectionId}
              message={message}
              setMessage={setMessage}
              // loading={loading}
              deleteCollection={deleteCollection}
              loadingDelete={loadingDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
