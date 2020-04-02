import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import App from '../Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { fetchLocations, fetchAreas, getAreaDetails } from './ApiCalls';
jest.mock('./ApiCalls');

describe('ApiCalls Tests', () => {
  let areaData;
  let fetchAreasResponse;

  beforeEach(() => {

    areaData = {
      "areas": [
        {
          "area": "RiNo",
          "details": "/api/v1/areas/590"
        },
        {
          "area": "Park Hill",
          "details": "/api/v1/areas/751"
        },
        {
          "area": "LoHi",
          "details": "/api/v1/areas/408"
        },
        {
          "area": "Cap Hill",
          "details": "/api/v1/areas/240"
        }
      ]
    }

    fetchAreasResponse = {
      "nickName": "RiNo",
      "details": "/api/v1/areas/590",
      "id": 590,
      "name": "River North",
      "location": "North of Downtown Denver",
      "about": "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
      "region_code": 6356834,
      "quick_search": "o5kod9f5cqo0",
      "listings": [
        "/api/v1/listings/3",
        "/api/v1/listings/44",
        "/api/v1/listings/221",
        "/api/v1/listings/744",
        "/api/v1/listings/90",
        "/api/v1/listings/310"
      ]
    }

  });

  it('should be able to fetch areas', async () => {
    const { getByText, unmount } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Ensures App is loading to DOM properly
    const logoEl = getByText('VRAD')
    expect(logoEl).toBeInTheDocument();

    expect(fetchAreas).toHaveBeenCalledTimes(1);
  });

  it('should call fetchAreas which, in turn calls getAreaDetails and outputs the correct data', async () => {
    jest.clearAllMocks();
    fetchAreas.mockImplementation(getAreaDetails(areaData));
    fetchAreas.mockResolvedValue(fetchAreasResponse);

    const { getByText, getByPlaceholderText, getByLabelText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(fetchAreas).toHaveBeenCalledTimes(1);
    expect(getAreaDetails).toHaveBeenCalledTimes(1);
    expect(getAreaDetails).toHaveBeenCalledWith(areaData);
  });

});
