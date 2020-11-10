import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-notfound">
      <div className="notfound-container">
        <h1>Oops!</h1>
        <h3>404 Page not found</h3>
        <p>
          We're sorry, the page you requested could not be found. <br />
          Please go back to the homepage or contact us at literature@support.me
        </p>
        <Link className="btn-notfound" to="/home">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
