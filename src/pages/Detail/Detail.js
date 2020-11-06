import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { API } from './../../config/api';
import LoadingSpinner from './../../components/commons/LoadingSpinner/LoadingSpinner';
import LiteratureDesc from './../../components/LiteratureDesc/LiteratureDesc';
// import PopupSuccess from './../../components/commons/PopupSuccess/PopupSuccess';

import { UserContext } from './../../context/userContext';
import { CollectionContext } from './../../context/collectionContext';

const Detail = () => {
  const { state } = useContext(UserContext);
  const { state: collectionState, dispatch } = useContext(CollectionContext);
  const [loading, setLoading] = useState(false);
  const [bookDetail, setBookDetail] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  // const [popupOpen, setPopupOpen] = useState(false);
  // const [isBookmark, setIsBookmark] = useState(false);

  const params = useParams();

  // const checkBookmark = (target, id) => {
  //   return (
  //     target.findIndex((item) => item.literature.id === parseInt(id)) !== -1
  //   );
  // };

  // const addCollection = async () => {
  //   try {
  //     const res = await API.post('/collection', {
  //       literatureId: params.id,
  //     });
  //     console.log('res: ', res);
  //     setPopupOpen(true);
  //     setIsBookmark(true);
  //   } catch (err) {
  //     setIsBookmark(false);
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const getCollection = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/collection/${state.user.id}`);
        dispatch({
          type: 'GET_COLLECTIONS',
          payload: res.data.data,
        });
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
      }
    };
    getCollection();
  }, []);

  useEffect(() => {
    const getDetailBook = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/literature/${params.id}`);
        // console.log('res: ', res);
        setLoading(false);
        setBookDetail(res.data.data);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        setErrorMessage(err.response.data.error.message);
      }
    };
    getDetailBook();
  }, [params.id]);

  return (
    <div className="container">
      <Navbar />
      {loading ? (
        <div className="loading-profile-literature">
          <LoadingSpinner />
        </div>
      ) : errorMessage ? (
        <div className="error-message book-not-exist">
          <div>
            <h1>{`Error 404: ${errorMessage}!`}</h1>
            <p>Try another literature's id</p>
          </div>
        </div>
      ) : (
        <LiteratureDesc
          // addCollection={addCollection}
          // checkBookmark={checkBookmark}
          // isBookmark={isBookmark}
          collectionState={collectionState}
          bookDetail={bookDetail}
          params={params}
        />
      )}
      {/* {popupOpen && <PopupSuccess setPopupOpen={setPopupOpen} />} */}
    </div>
  );
};

export default Detail;
