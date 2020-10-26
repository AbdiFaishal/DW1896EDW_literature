import React from 'react';
import Logo from './../Logo/Logo';
import defaultAvatar from '../../images/icons/no-profile-picture.png';

const NavbarAdmin = ({
  state,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}) => {
  return (
    <div className="navbar">
      <Logo />
      <div className="admin-avatar">
        <img
          onClick={() => setDropdownOpen(!dropdownOpen)}
          src={state.user.avatar ? state.user.avatar : defaultAvatar}
          alt=""
        />
        {dropdownOpen && (
          <div className="dropdown-admin">
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;
