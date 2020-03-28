import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({ isLoggedIn, toggleLogin }) => {
  const blankUser = {
    isLoggedIn: false,
    userInfo: {
      name: "",
      email: "",
      purpose: "",
      favoriteLocations: []
    },
    areas: [],
    listings:[],
    currentView: 'Login'
  }

  return (
    <header>
      <div className="logo">VRAD</div>
      {isLoggedIn && (
        <button
          onClick={() => toggleLogin(blankUser)}
        >Log Out</button>
      )}
    </header>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  toggleLogin: PropTypes.func
}

export default Header;
