import React from 'react';
import { render } from '@testing-library/react';
import AreaContainer from './AreaContainer';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe("AreaContainer", () => {
  it("should display a list of areas", () => {
    const areaData = [
      {
          "nickName": "RiNo",
          "name": "River North",
          "details": "/api/v1/areas/590",
          "listings": [1,2,4]
      },
      {
          "nickName": "Park Hill",
          "name": "Park Hill",
          "details": "/api/v1/areas/751",
          "listings": [1,2,4,8,8,1]
      }
    ];

    const { getByText } = render(
      <BrowserRouter>
        <AreaContainer areas={areaData} />
      </BrowserRouter>
    );

    const areaEl1 = getByText('River North - (RiNo)');
    const areaEl2 = getByText('Park Hill');

    expect(areaEl1).toBeInTheDocument();
    expect(areaEl2).toBeInTheDocument();
  });

});
