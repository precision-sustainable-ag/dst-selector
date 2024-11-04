import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import SoilComposition from './SoilComposition';
import configureStore from '../../../../reduxStore/store';
import { setSoilRedux } from '../../../../reduxStore/soilSlice';
import { setMapRedux } from '../../../../reduxStore/mapSlice';

/* eslint-disable no-undef */

describe('<SoilComposition />', () => {
  let reduxStore;
  let soilDataRedux;
  let mapData;
  beforeEach(() => {
    reduxStore = configureStore({});
    soilDataRedux = {
      soilData: {
        mapUnitName: 'my farm land',
      },
      soilDataOriginal: {
        mapUnitName: 'My farm land',
      },
    };
    reduxStore.dispatch(setSoilRedux(soilDataRedux));

    mapData = {
      stateLabel: 'North Carolina',
    };
    reduxStore.dispatch(setMapRedux(mapData));

    mount(
      <Provider store={reduxStore}>
        <SoilComposition />
      </Provider>,
    );
  });

  it('renders the Soil Composition card without the soil data', () => {
    cy.assertByTestId('soil-composition-card');
  });

  it('should have the soil information when redux soil data state is loaded', () => {
    cy.assertByTestId('map-unit-name-text').should('have.text', soilDataRedux.soilData.mapUnitName);
  });

  it('should not render the soil composition card when state is Ontario', () => {
    mapData = {
      stateLabel: 'Ontario',
    };
    reduxStore.dispatch(setMapRedux(mapData));

    cy.get("[data-test='soil-composition-card']").should('not.exist');
  });
});
