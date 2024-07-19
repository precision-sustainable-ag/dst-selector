import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import SiteConditions from './SiteConditions';
import { setAddressRedux } from '../../../reduxStore/addressSlice';
import { setMapRedux } from '../../../reduxStore/mapSlice';
import { setSharedRedux } from '../../../reduxStore/sharedSlice';
import configureStore from '../../../reduxStore/store';
import { setSoilRedux } from '../../../reduxStore/soilSlice';

/* eslint-disable no-undef */

describe('<SiteConditions />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({});

    cy.intercept('GET', '**/*', {
      statusCode: 200,
      body: {
        type: 'object',
        data: {
          values: [
            {
              label: 'None',
            },
            {
              label: 'Very rare',
            },
          ],
        },
      },
    }).as('getFloodingFrequency');

    // Mock POST requests
    cy.intercept('POST', '**/*', (req) => {
      req.reply('');
    }).as('blockPostRequests');
  });

  it('should render all site condition cards', () => {
    const addressData = {
      address: '209 West Capitol Avenue',
      markers: [
        [
          38.579201,
          -92.172935,
        ],
      ],
      county: 'Cole County',
    };

    reduxStore.dispatch(setAddressRedux(addressData));

    const mapData = {
      regions: [
        {
          id: 650,
          label: 'All Counties Average',
          shorthand: 'All Counties Average',
          localityId: 3,
          createdAt: '2023-02-27T20:56:26.049Z',
          updatedAt: '2023-02-27T20:56:26.049Z',
          deletedAt: null,
        },

      ],
      regionId: 676,
      regionShorthand: 'Cole',
      stateId: 29,
      stateLabel: 'Missouri',
      councilShorthand: 'MCCC',
      councilLabel: 'Midwest Cover Crops Council',
    };

    reduxStore.dispatch(setMapRedux(mapData));

    const sharedData = {
      progress: 2,
      snackOpen: false,
      snackMessage: '',
      ajaxInProgress: false,
      myCoverCropActivationFlag: false,
      speciesSelectorActivationFlag: true,
      comparisonKeys: [],
      myCoverCropListLocation: '',
      regionToggle: true,
      apiBaseUrl: 'developapi',
      openMyCoverCropReset: {
        open: false,
        goBack: true,
      },
    };

    reduxStore.dispatch(setSharedRedux(sharedData));

    const soilData = {
      soilData: {
        mapUnitName: 'my city land',
        drainageClass: [],
        floodingFrequency: [],
        latLong: [],
        for: {
          lat: 38.579201,
          lon: -92.172935,
        },
      },
      soilDataOriginal: {
        mapUnitName: 'My city land',
        drainageClass: [],
        floodingFrequency: [],
        latLong: [],
        for: {
          lat: 38.579201,
          lon: -92.172935,
        },
      },
    };

    reduxStore.dispatch(setSoilRedux(soilData));
    mount(
      <Provider store={reduxStore}>
        <SiteConditions />
      </Provider>,
    );
    // Wait for all blocked requests to be intercepted
    cy.wait(['@getFloodingFrequency', '@blockPostRequests']);

    cy.assertByTestId('soil-composition-card');
    cy.assertByTestId('frost-dates-card');
    cy.assertByTestId('precipitation-card');
    cy.assertByTestId('soil-drainage-card');
    cy.assertByTestId('flooding-frequency-card');
  });
});
