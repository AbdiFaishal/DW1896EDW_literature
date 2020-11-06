import React from 'react';
import './style.css';
import SearchIcon from '../../images/icons/search-icon.png';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';

const SearchInput = ({
  title,
  handleChange,
  handleSubmit,
  handleClearInput,
}) => {
  return (
    <form className="search-input" onSubmit={(e) => handleSubmit(e)}>
      <input
        value={title}
        name="title"
        type="text"
        placeholder="Search your literature"
        onChange={(e) => handleChange(e)}
      />
      {title && (
        <IconContext.Provider value={{ className: 'delete-search-icon' }}>
          <div className="delete-search-mark">
            <VscChromeClose onClick={handleClearInput} />
          </div>
        </IconContext.Provider>
      )}

      <button className="btn">
        <img src={SearchIcon} alt="search icon" />
      </button>
    </form>
  );
};

export default SearchInput;
