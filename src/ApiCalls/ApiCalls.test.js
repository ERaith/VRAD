import React from 'react';
import { render } from '@testing-library/react';
import App from '../Components/App/App';
import { fetchLocations, fetchAreas, getAreaDetails } from './ApiCalls';
import { BrowserRouter } from 'react-router-dom';

describe('ApiCalls Tests', () => {

  it('should be able to fetch areas', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const logoEl = getByText('VRAD')

    expect(logoEl).toBeInTheDocument();


  });

});
