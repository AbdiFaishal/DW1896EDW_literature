import React, { useState } from 'react';
import './style.css';
import Navbar from '../../components/Navbar/Navbar';

import PopupAddBook from './../../components/commons/PopupAddBook/PopupAddBook';
import { API } from './../../config/api';
import LoadingProcess from './../../components/commons/LoadingProcess/LoadingProcess';

const AddLiterature = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textError, setTextError] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    publication_date: '',
    pages: '',
    isbn: '',
    author: '',
    attache: null,
    image: null,
  });
  const {
    title,
    publication_date,
    pages,
    isbn,
    author,
    attache,
    image,
  } = bookData;

  console.log('state data: ', bookData);
  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('publication_date', publication_date);
      formData.append('pages', pages);
      formData.append('isbn', isbn);
      formData.append('author', author);
      formData.append('attache', attache);
      formData.append('image', image);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      setLoading(true);
      const res = await API.post(`/literature`, formData, config);
      setLoading(false);
      setTextError(null);
      setPopupOpen(true);
      setBookData({
        title: '',
        publication_date: '',
        category: '',
        pages: '',
        isbn: '',
        author: '',
        attache: null,
        image: null,
      });
      console.log('res: ', res);
    } catch (err) {
      setLoading(false);
      setTextError(err.response.data.error.message);

      console.log(err.response);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div>
        <div className="add-book-form">
          <h1>Add Literature</h1>
          <form onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={(e) => handleChange(e)}
              name="title"
              className="input-text"
              type="text"
              placeholder="Title"
            />
            <input
              value={publication_date}
              onChange={(e) => handleChange(e)}
              name="publication_date"
              className="input-text"
              type="text"
              placeholder="Publication Date"
            />
            <input
              value={pages}
              onChange={(e) => handleChange(e)}
              name="pages"
              className="input-text"
              type="text"
              placeholder="Pages"
            />
            <input
              value={isbn}
              onChange={(e) => handleChange(e)}
              name="isbn"
              className="input-text"
              type="text"
              placeholder="ISBN"
            />
            <input
              value={author}
              onChange={(e) => handleChange(e)}
              name="author"
              className="input-text"
              type="text"
              placeholder="Author"
            />
            <div className="attache-book-cover">
              <input
                // value={image}
                onChange={(e) => handleFileChange(e)}
                name="image"
                className="input-file"
                type="file"
                id="image-box"
                style={{ color: 'transparent' }}
              />
              <label name="" className="label-file-box" htmlFor="image-box">
                {image ? image.name : 'Attache Literature Screenshot'}
              </label>
            </div>
            <div className="attache-book-file">
              <input
                // value={file}
                onChange={(e) => handleFileChange(e)}
                name="attache"
                className="input-file"
                type="file"
                id="file-box"
                style={{ color: 'transparent' }}
              />
              <label name="" className="label-file-box" htmlFor="file-box">
                {attache ? attache.name : 'Attache Literature File'}
              </label>
            </div>

            <button className="btn btn-add-book-form" disabled={loading}>
              {loading ? <LoadingProcess /> : 'Add Literature'}
            </button>
          </form>
        </div>
        {popupOpen ? (
          <PopupAddBook
            setPopupOpen={setPopupOpen}
            textError={textError}
            setTextError={setTextError}
          />
        ) : (
          textError && (
            <PopupAddBook
              setPopupOpen={setPopupOpen}
              textError={textError}
              setTextError={setTextError}
            />
          )
        )}
      </div>
    </div>
  );
};

export default AddLiterature;
