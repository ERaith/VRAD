import React from "react";
import PropTypes from "prop-types";
import { IMG_PATH } from "../../constants/Constants";
import { Link } from 'react-router-dom';

const LocationCard = props => {
  const {
    address,
    name,
    listing_id
  } = props.listingData;
  const { isFavorite, areaName } = props;
  const urlName = name.toLowerCase().split(' ').join('-');

  return (
    <article className="card">
      <div className="img-container">
        <img src={`${IMG_PATH + listing_id}_a.jpg`} alt = {name+'Image'}/>
      </div>
      <div className="info-container">
        <h2 className="card-heading" aria-label={name}>
          {name}
        </h2>
        <h3 aria-label={address.street}>{address.street}</h3>
        <div className="button-wrap">
          <button
            className={`${isFavorite(listing_id)}`}
            onClick={() => props.favorite(listing_id)}
            >
            {`${isFavorite(listing_id)}`}
          </button>
          <Link
            to={`/areas/${areaName}/${urlName}`}
            onClick={() => props.goToListing(props.listingData, "LocationListingCard")}
            >
            <button>Go to Listing</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

LocationCard.propTypes = {
  favorite: PropTypes.func,
  favoriteLocations: PropTypes.array,
  goToListing: PropTypes.func,
  listingData: PropTypes.shape({
    address: PropTypes.object,
    area_id: PropTypes.number,
    details: PropTypes.object,
    name:PropTypes.string,
    listing_id:PropTypes.number
  }),
  isFavorite:PropTypes.func,
  areaName:PropTypes.string

};

export default LocationCard;
