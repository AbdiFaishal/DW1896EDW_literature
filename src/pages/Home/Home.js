import React, { useState, useContext } from 'react';
import BigLogo from '../../components/BigLogo/BigLogo';
import Navbar from '../../components/Navbar/Navbar';

import { useHistory } from 'react-router-dom';
import { API } from './../../config/api';
import { LiteratureContext } from './../../context/literatureContext';
import SearchInput from '../../components/SearchInput.js/SearchInput';
import LoadingSpinner from './../../components/commons/LoadingSpinner/LoadingSpinner';
import WrapperMessage from '../../components/commons/WrapperMessage/WrapperMessage';

const Home = () => {
  const history = useHistory();
  // const location = useLocation();
  const { state, dispatch } = useContext(LiteratureContext);
  const [form, setForm] = useState({
    title: '',
  });
  const { title } = form;
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        let params = {};
        if (title) {
          params = {
            title,
          };
        }
        // setLoading(true);
        dispatch({
          type: 'FETCH_LITERATURES_PENDING',
        });
        const { data } = await API.get(`/literature`, {
          params,
        });
        dispatch({
          type: 'FETCH_LITERATURES_SUCCESS',
          payload: data.data,
        });
        history.push('/search');
      } catch (err) {
        console.log(err.response);
        dispatch({
          type: 'FETCH_LITERATURES_FAILED',
          payload: err.response.data.error.message,
        });
      }
    }
  };

  // console.log('location: ', location);

  return (
    <div className="container">
      <Navbar />
      <div className="flex-wrapper">
        <BigLogo />
        <SearchInput handleChange={handleChange} handleSubmit={handleSubmit} />
        {state.loading ? (
          <LoadingSpinner />
        ) : (
          state.error && (
            <WrapperMessage>
              <p>{state.error}</p>
            </WrapperMessage>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
