import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const UserProfile = ({ userInfo, goToFavRentals,pathName}) => {

  const { name, email, purpose, favoriteLocations } = userInfo;
  const greeting = `Select from the following areas to find the perfect location for your ${purpose} trip!`;
  const favoritePathHelper = () => {
    if(pathName.includes('areas/favorites')){
      return '/favorites'
    } else if(pathName.includes('favorites')){
      return '/areas'
    } else {
      return '/favorites'
    }
  }

  return (
    <div className="user-profile">
      <div className="welcome-header">
        <h3>{`Welcome, ${name}!`}</h3>
        <p className="greeting">{greeting}</p>
        <p className="email">{email}</p>
      </div>
      <div className="user-meta">
        <h4>Reason for visiting:</h4>
        <p className="purpose">{purpose}</p>
        <Link
          to= {favoritePathHelper()}
          >
          <button
            className = {pathName.includes('favorites')?'favorite-button-active':'favorite-button-inactive'}
            onClick={goToFavRentals}
            >Favorited Rentals <span>{favoriteLocations.length}</span></button>
        </Link>
      </div>
      <div></div>
    </div>
  )
}

UserProfile.propTypes = {
  userInfo: PropTypes.object,
  goToFavRentals: PropTypes.func,
  pathName: PropTypes.string,

}

export default UserProfile;
