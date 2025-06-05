import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import SiteConditions from './SiteConditions';
import { setAddressRedux } from '../../reduxStore/addressSlice';
import { setMapRedux } from '../../reduxStore/mapSlice';
import { setSharedRedux } from '../../reduxStore/sharedSlice';
import configureStore from '../../reduxStore/store';
import { setSoilRedux } from '../../reduxStore/soilSlice';
import { setWeatherReduxForTest } from '../../reduxStore/weatherSlice';

/* eslint-disable no-undef */

describe('<SiteConditions />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({});

    cy.intercept('GET', '**/v2/attribute?filtered=false&slug=flooding_frequency*', {
      statusCode: 200,
      body: {
        type: 'object',
        data: {
          id: 950,
          label: 'Flooding Frequency',
          slug: 'flooding_frequency',
          description: 'Options for Flooding Frequency in Site Conditions section.',
          units: '',
          details: '',
          order: 1,
          isArray: false,
          isKeyTrait: false,
          isFilter: false,
          isMinimal: false,
          isGoal: false,
          dataTypeId: 1,
          unitRangeId: null,
          categoryId: 3,
          createdAt: null,
          updatedAt: null,
          deletedAt: null,
          values: [
            {
              id: 35982,
              value: '0',
              label: 'None',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
            {
              id: 35983,
              value: '1',
              label: 'Very rare',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
            {
              id: 35984,
              value: '2',
              label: 'Rare',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
            {
              id: 35985,
              value: '3',
              label: 'Occasional',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
            {
              id: 35986,
              value: '4',
              label: 'Frequent',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
            {
              id: 35987,
              value: '5',
              label: 'Very frequent',
              dataType: 'string',
              attributeId: 950,
              order: 1,
              createdAt: '2024-02-20T20:22:03.911Z',
              updatedAt: '2024-02-20T20:22:03.911Z',
              deletedAt: null,
            },
          ],
        },
        attributions: {},
      },
    }).as('getFloodingFrequency');

    cy.intercept('GET', '**/v1/attribute-values?slug=soil_drainage&regions*', {
      statusCode: 200,
      body: {
        type: 'object',
        data: [
          {
            id: 1496,
            value: 'Very poorly drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 1,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1499,
            value: 'Poorly drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 2,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1501,
            value: 'Somewhat poorly drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 3,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1500,
            value: 'Moderately well drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 4,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1498,
            value: 'Well drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 5,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1495,
            value: 'Somewhat excessively drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 6,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
          {
            id: 1502,
            value: 'Excessively drained',
            label: null,
            dataType: 'string',
            attributeId: 140,
            order: 7,
            createdAt: '2022-10-28T17:00:49.666Z',
            updatedAt: '2022-10-28T17:00:49.666Z',
            deletedAt: null,
          },
        ],
        attributions: {},
      },
    }).as('getDrainageOptions');
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
      queryString: 'regions=650',
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

    const weatherData = {
      averageFrost: {
        firstFrostDate: {
          month: 'September',
          day: '26',
        },
        lastFrostDate: {
          month: 'June',
          day: '17',
        },
      },
      averagePrecipitation: {
        thisMonth: '40.27',
        annual: '400.71',
      },
      frostFreeDays: 367,
    };
    reduxStore.dispatch(setWeatherReduxForTest(weatherData));

    mount(
      <Provider store={reduxStore}>
        <SiteConditions />
      </Provider>,
    );
    // Wait for all blocked requests to be intercepted
    cy.wait(['@getDrainageOptions', '@getFloodingFrequency']);

    cy.assertByTestId('soil-composition-card');
    cy.assertByTestId('frost-dates-card');
    cy.assertByTestId('precipitation-card');
    cy.assertByTestId('soil-drainage-card');
    cy.assertByTestId('flooding-frequency-card');
  });
});
