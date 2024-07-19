import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'cypress/react18';
import SoilDrainage from './SoilDrainage';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<SoilDrainage />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({});
    mount(
      <Provider store={reduxStore}>
        <SoilDrainage />
      </Provider>,
    );
  });

  it('should render the soil drainage card', () => {
    cy.assertByTestId('soil-drainage-card');
    cy.get('[datay-cy="drainage-reset-button"]').should('not.exist');
    cy.get('[data-cy="tiling-check-switch"]').should('not.exist');
  });

  it('should render the reset button and tiling check switch when a drainage class chip is clicked', () => {
    for (let i = 0; i < 3; i++) {
      cy.assertByTestId(`drainage-class-chip-${i}`).click();
      cy.assertByTestId('tiling-check-switch');
      cy.assertByTestId('drainage-reset-button');
    }
  });
});
