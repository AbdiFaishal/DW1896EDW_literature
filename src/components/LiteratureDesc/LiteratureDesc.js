import React, { useState, useContext } from 'react';
import bigCover from '../../images/utils/bigCoverLiterature.png';
import axios from 'axios';
import { API } from './../../config/api';
import PopupSuccess from './../commons/PopupSuccess/PopupSuccess';
import { CollectionContext } from './../../context/collectionContext';
import LoadingProcess from '../commons/LoadingProcess/LoadingProcess';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// import { convertString } from '../GlobalFunction';
const LiteratureDesc = ({
  bookDetail,
  collectionState,
  params,
  // checkBookmark,
  // isBookmark,
  // addCollection,
}) => {
  const { state } = useContext(CollectionContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  // console.log('collection state: ', state);

  const checkBookmark = (target, id) => {
    return (
      target.findIndex((item) => item.literature.id === parseInt(id)) !== -1
    );
  };

  const addCollection = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await API.post('/collection', {
        literatureId: params.id,
      });
      console.log('res: ', res);
      setMessage(res.data.message);
      setLoading(false);
      setPopupOpen(true);
      setIsBookmark(true);
    } catch (err) {
      setMessage(err.response.data.error.message);
      setIsBookmark(false);
      setLoading(false);
      console.log(err.response);
    }
  };

  const handleDownload = async (url) => {
    try {
      const res = await axios.get(url, {
        responseType: 'blob',
      });
      const newUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = newUrl;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detail-book-main">
      <div className="book-desc">
        <div className="book-cover">
          <Zoom overlayBgColorEnd="rgba(255, 255, 255, 0.15)">
            <img
              height="545"
              width="auto"
              src={bookDetail.image || bigCover}
              alt=""
            />
          </Zoom>
        </div>
        <div className="book-info">
          <div className="book-title-author">
            <h1>{bookDetail.title}</h1>
            <p>{bookDetail.author}</p>
          </div>
          <div className="book-date">
            <p className="book-header">Publication date</p>
            <p className="book-header-content">{bookDetail.publication_date}</p>
          </div>
          <div className="book-page-info">
            <p className="book-header">Pages</p>
            <p className="book-header-content">{bookDetail.pages}</p>
          </div>
          <div className="book-isbn">
            <p className="book-header">ISBN</p>
            <p className="book-header-content">{bookDetail.isbn}</p>
          </div>
          <div className="book-button">
            <button
              className="btn btn-download"
              onClick={() => handleDownload(bookDetail.attache)}
            >
              Download
            </button>
          </div>
        </div>
        <div className="add-collection">
          {isBookmark ? null : collectionState.collections.length &&
            checkBookmark(collectionState.collections, params.id) ? null : (
            <button
              onClick={addCollection}
              className="btn btn-collection"
              disabled={loading}
            >
              {loading ? <LoadingProcess /> : 'Add Collection'}
            </button>
          )}
        </div>
      </div>
      {popupOpen && (
        <PopupSuccess message={message} setPopupOpen={setPopupOpen} />
      )}
    </div>
  );
};

export default LiteratureDesc;
