import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingProcess from '../commons/LoadingProcess/LoadingProcess';
import { API, setAuthToken } from './../../config/api';
import { UserContext } from './../../context/userContext';

const LoginModal = ({ setLoginOpen, setRegisterOpen }) => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLoginMessage('');
  };

  const closeModal = (e) => {
    setLoginOpen(false);
  };

  const moveToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      setLoading(true);
      const res = await API.post('/login', body, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.data,
      });
      setAuthToken(res.data.data.token);
      setLoginMessage(res.data.message);
      setLoading(false);

      try {
        const res = await API.get('/auth');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data.user,
        });
        if (res.data.data.user.role === 'admin') {
          setTimeout(() => {
            history.push('/admin');
          }, 150);
        } else {
          setTimeout(() => {
            history.push('/home');
          }, 150);
        }
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    } catch (err) {
      console.log('error: ', err.response);
      setLoginMessage(err.response.data.error.message);
      setLoading(false);

      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  };

  return (
    <div className="modal-parent">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="login-modal">
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="email"
            onChange={(e) => handleChange(e)}
            value={form.email}
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            onChange={(e) => handleChange(e)}
            value={form.password}
            type="password"
            placeholder="Password"
          />
          <div className="login-register-message">
            <p
              className={
                loginMessage === 'Login Success'
                  ? 'login-success'
                  : 'login-error'
              }
            >
              {loginMessage && loginMessage}
            </p>
          </div>
          <button className="btn" disabled={loading}>
            {loading ? <LoadingProcess /> : 'Sign In'}
          </button>
        </form>

        <p>
          Don't have an account ? Click{' '}
          <Link to="/" onClick={moveToRegister}>
            Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
