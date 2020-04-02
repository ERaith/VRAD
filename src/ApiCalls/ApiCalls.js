import { BASE_URL } from "../constants/Constants";

export const fetchAreas = () => {
  return fetch('http://localhost:3001/api/v1/areas')
    .then(res => res.json())
    .then(areaData => getAreaDetails(areaData))
    .catch(err => console.log(err.message));
};

export const getAreaDetails = (areaData) => {
  const BASE_URL = 'http://localhost:3001';
  const promises = areaData.areas.map(area => {
    const AREA_ENDPOINT = area.details;
    return fetch(BASE_URL + AREA_ENDPOINT)
      .then(response => response.json())
      .then(areaInfo => {
        return {
          nickName: area.area,
          details:area.details,
          ...areaInfo
        }
      })
  })
  return Promise.all(promises);
}

export const fetchLocations = (listings) => {
  if(listings.length === 0) {
    return  []
  }
  const promises = listings.map(listing => {
    return fetch(BASE_URL + listing)
      .then(res => res.json())
      .then(listing => {
        return {
          ...listing
        };
      })
      .catch(err => {
        return err;
      });
  });
  return Promise.all(promises);
};
