import React, { useState } from 'react';
import bigCover from '../../images/utils/bigCoverLiterature.png';
import { API } from './../../config/api';
// import axios from 'axios';
// import { CollectionContext } from './../../context/collectionContext';

import PopupSuccess from './../commons/PopupSuccess/PopupSuccess';
import LoadingProcess from '../commons/LoadingProcess/LoadingProcess';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const LiteratureDesc = ({
  bookDetail,
  collectionState,
  params,
  // checkBookmark,
  // isBookmark,
  // addCollection,
}) => {
  // const { state } = useContext(CollectionContext);
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

  // const handleDownload = async (url) => {
  //   try {
  //     const res = await axios.get(url, {
  //       responseType: 'blob',
  //     });
  //     const newUrl = window.URL.createObjectURL(new Blob([res.data]));
  //     const link = document.createElement('a');
  //     link.href = newUrl;
  //     // link.setAttribute('download', 'file.pdf');
  //     link.setAttribute('download', linkFormat(url));
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="detail-book-main">
      <div className="book-desc">
        <div className="book-cover">
          <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.7)">
            <img
              width="auto"
              height="545"
              // width="auto"
              // height="auto"
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
            {/* <button className="btn btn-download">
              {bookDetail.attache && (
                <a
                  href={bookDetail.attache}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              )}
            </button> */}
            <a
              className="btn btn-download"
              href={bookDetail.attache}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
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
