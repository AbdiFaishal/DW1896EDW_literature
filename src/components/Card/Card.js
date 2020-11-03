import React from 'react';
import './style.css';
import image from '../../images/utils/book-card.png';
import { useHistory } from 'react-router-dom';

import { convertTitle, convertString } from '../GlobalFunction';

const Card = (props) => {
  // console.log('props: ', props);
  const history = useHistory();
  const convertDate = (date) => {
    let split = date.split(' ');
    return split[split.length - 1];
  };

  const moveToDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  // console.log('props: ', props);
  return (
    <div className="card-book-container">
      <div className="card-book" onClick={() => moveToDetail(props.id)}>
        <img src={props.image || image} alt="" />
        <p className="title">{props.title && convertTitle(props.title)}</p>
        <div className="author-year-group">
          <p className="author">{convertString(props.author, 15)}</p>
          <p className="year">
            {props.publication_date && convertDate(props.publication_date)}
          </p>
        </div>
      </div>
      {props.status === 'waiting' && (
        <div className="book-waiting">
          <p>Waiting to be verified</p>
        </div>
      )}
    </div>
  );
};

export default Card;
