import React, { useContext } from 'react';
import './style.css';
import { UserContext } from './../../context/userContext';
import { useHistory } from 'react-router-dom';

const Title = ({ setLoginOpen, setRegisterOpen }) => {
  const { state } = useContext(UserContext);
  let history = useHistory();

  const signInOnClick = () => {
    if (state.isLogin) {
      if (state.user.role === 'admin') {
        history.push('/admin');
      } else {
        history.push('/home');
      }
    }
    setLoginOpen(true);
  };
  return (
    <div className="landing-title">
      <h1>
        source <span>of</span> intelligence
      </h1>
      <p>
        Sign-up and receive unlimited access to all of your literature - share
        your literature.
      </p>
      <button className="btn btn-signup" onClick={() => setRegisterOpen(true)}>
        Sign Up
      </button>
      <button className="btn btn-signin" onClick={() => signInOnClick(true)}>
        Sign In
      </button>
    </div>
  );
};

export default Title;
