import React, { useContext } from 'react';
import './style.css';

import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { UserContext } from './../../context/userContext';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const userLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // localStorage.removeItem('isLogin');
  };
  return (
    <div className="navbar">
      <ul className="reset">
        {state.user.role === 'admin' && (
          <li>
            <NavLink to="/admin" activeClassName="selected">
              Dashboard
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/profile" activeClassName="selected">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-collection" activeClassName="selected">
            My Collection
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-literature" activeClassName="selected">
            Add Literature
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/" onClick={userLogout} activeClassName="selected">
            Logout
          </NavLink>
        </li>
      </ul>
      <Logo />
    </div>
  );
};

export default Navbar;
