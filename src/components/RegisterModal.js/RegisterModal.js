import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './../../context/userContext';
import { API, setAuthToken } from './../../config/api';
import LoadingProcess from '../commons/LoadingProcess/LoadingProcess';

const RegisterModal = ({ setRegisterOpen, setLoginOpen }) => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const closeModal = (e) => {
    setRegisterOpen(false);
  };

  const moveToLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form: ', form);
    try {
      setLoading(true);
      const res = await API.post('/register', form);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data.data,
      });
      setAuthToken(res.data.data.token);
      setLoading(false);
      setMessage(res.data.message);

      try {
        const res = await API.get('/auth');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data.user,
        });
        if (res.data.data.user.role === 'admin') {
          setTimeout(() => {
            history.push('/admin');
          }, 750);
        } else {
          setTimeout(() => {
            history.push('/home');
          }, 750);
        }
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    } catch (err) {
      setMessage(err.response.data.error.message);
      setLoading(true);

      dispatch({
        type: 'REGISTER_FAIL',
      });
    }
  };

  return (
    <div className="modal-parent">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="register-modal">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            value={form.fullName}
            type="text"
            placeholder="Full Name"
          />
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            placeholder="Gender"
          >
            <option className="option-hidden" value="" hidden>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            value={form.phone}
            type="text"
            placeholder="Phone"
          />
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
          />
          <div className="login-register-message">
            <p
              className={
                message === 'Your new account has been created successfully'
                  ? 'login-success'
                  : 'login-error'
              }
            >
              {message && message}
            </p>
          </div>
          <button className="btn" disabled={loading}>
            {loading ? <LoadingProcess /> : 'Sign Up'}
          </button>
        </form>
        <p>
          Already have an account ? Click{' '}
          <Link to="/" onClick={moveToLogin}>
            Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
