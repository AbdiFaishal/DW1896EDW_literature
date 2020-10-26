import React from 'react';
import image from '../../images/utils/book-card.png';
import { useHistory } from 'react-router-dom';
import deleteIcon from '../../images/icons/delete3.png';

import { convertString } from '../GlobalFunction';

const CardCollection = (props) => {
  console.log('props: ', props);
  const history = useHistory();
  const convertDate = (date) => {
    let split = date.split(' ');
    return split[split.length - 1];
  };

  const handleModal = (id) => {
    props.setMessage('');
    props.setConfirmModal(true);
    props.setCollectionId(id);
  };

  const moveToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  return (
    <div className="card-book-container">
      <div
        className="card-book"
        onClick={() => moveToDetail(props.literature.id)}
      >
        <img src={image} alt="" />
        <p className="title">{convertString(props.literature.title, 25)}</p>
        <div className="author-year-group">
          <p className="author">{convertString(props.literature.author, 16)}</p>
          <p className="year">
            {props.literature.publication_date &&
              convertDate(props.literature.publication_date)}
          </p>
        </div>
      </div>
      <div className="delete-collection">
        <button className="btn" onClick={() => handleModal(props.id)}>
          <img src={deleteIcon} alt="" />
        </button>
      </div>
      {/* {props.status === 'waiting' && (
        <div className="book-waiting">
          <p>Waiting to be verified</p>
        </div>
      )} */}
    </div>
  );
};

export default CardCollection;

// <button
//   onClick={() => deleteCollection(params.id)}
//   className="btn btn-collection"
//   disabled={loading}
// >
//   {loading ? 'Loading' : 'Delete Collection'}
// </button>;

// const deleteCollection = async (literatureId) => {
//   try {
//     setLoading(true);
//     setMessage('');
//     const res = await API.delete(`delete-collection/${literatureId}`);

//     setIsBookmark(false);
//     setMessage(res.data.message);
//     setLoading(false);
//     setPopupOpen(true);
//   } catch (err) {
//     setLoading(false);
//     console.log(err.response);
//   }
// };
