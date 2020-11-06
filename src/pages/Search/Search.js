import React, { useState, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SearchInput from '../../components/SearchInput.js/SearchInput';
import { LiteratureContext } from './../../context/literatureContext';
import { API } from './../../config/api';
import Card from '../../components/Card/Card';
import LoadingSpinner from '../../components/commons/LoadingSpinner/LoadingSpinner';

import arrowDown from '../../images/icons/arrow-down.png';
import WrapperMessage from './../../components/commons/WrapperMessage/WrapperMessage';
import { useEffect } from 'react';

const years = [
  { value: 2020 },
  { value: 2019 },
  { value: 2018 },
  { value: 2017 },
  { value: 2016 },
  { value: 2015 },
  { value: 2014 },
  { value: 2013 },
  { value: 2012 },
  { value: 2011 },
  { value: 2010 },
  { value: 2009 },
  { value: 2008 },
  { value: 2007 },
  { value: 2006 },
  { value: 2005 },
  { value: 2004 },
  { value: 2003 },
  { value: 2002 },
  { value: 2001 },
  { value: 2000 },
];
const Search = () => {
  const { state, dispatch } = useContext(LiteratureContext);
  const [form, setForm] = useState({
    title: '',
    year: '',
  });

  const { title, year } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClearInput = () => {
    setForm({
      ...form,
      title: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let params = {};
      if (title && year) {
        params = {
          title,
          year,
        };
      } else if (title) {
        params = {
          title,
        };
      } else {
        params = {
          year,
        };
      }
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
      setForm({
        title: '',
        year: '',
      });
    } catch (err) {
      // console.log(err.response);
      dispatch({
        type: 'FETCH_LITERATURES_FAILED',
        payload: err.response.data.error.message,
      });
      setForm({
        title: '',
        year: '',
      });
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div>
        <SearchInput
          title={title}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClearInput={handleClearInput}
        />
        <div className="flex-20-80">
          <div className="flex-20 dropdown-year">
            <p>Anytime</p>
            <div className="dropdown-wrapper">
              <button className="btn btn-year">
                {year ? year : 'Since 2020'}
                {!year && <img src={arrowDown} alt="" />}
              </button>
              <div className="dropdown-content">
                {years.map((year, index) => {
                  return (
                    <p
                      onClick={() => setForm({ ...form, year: year.value })}
                      key={index}
                    >
                      {year.value}
                    </p>
                  );
                })}
              </div>
            </div>
            {/* <form>
              <select
                value={year}
                onChange={(e) => handleChange(e)}
                placeholder="Gender"
                name="year"
              >
                <option className="option-hidden dropdown-list" value="" hidden>
                  Since 2020
                </option>
                {years.map((year, index) => (
                  <option
                    key={index}
                    value={year.value}
                    className="dropdown-list"
                  >
                    {year.value}
                  </option>
                ))}
              </select>
            </form> */}
          </div>
          <div className="list-card-container flex-80">
            {state.loading ? (
              <div className="loading-profile-literature">
                <LoadingSpinner />
              </div>
            ) : state.error ? (
              <WrapperMessage>
                <p>{state.error}</p>
              </WrapperMessage>
            ) : (
              state.literatures.map((item) => <Card key={item.id} {...item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
