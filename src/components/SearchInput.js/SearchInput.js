import React from 'react';
import './style.css';
import SearchIcon from '../../images/icons/search-icon.png';

const SearchInput = ({ title, handleChange, handleSubmit }) => {
  return (
    <form className="search-input" onSubmit={(e) => handleSubmit(e)}>
      <input
        value={title}
        name="title"
        type="text"
        placeholder="Search your literature"
        onChange={(e) => handleChange(e)}
      />
      <button className="btn">
        <img src={SearchIcon} alt="search icon" />
      </button>
    </form>
  );
};

export default SearchInput;
