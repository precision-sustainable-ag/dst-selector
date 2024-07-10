import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import SoilFloodingFrequency from './SoilFloodingFrequency';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<SoilFloodingFrequency />', () => {
  let reduxStore;
  const floodingOptions = [
    { label: 'None' },
    { label: 'Very rare' },
    { label: 'Rare' },
    { label: 'Occasional' },
    { label: 'Frequent' },
    { label: 'Very frequent' },
  ];

  beforeEach(() => {
    reduxStore = configureStore({});
  });

  const mountComponentWithProp = (props) => {
    mount(
      <Provider store={reduxStore}>
        <SoilFloodingFrequency {...props} />
      </Provider>,
    );
  };

  it('should render flooding frequency card with an empty flood options array', () => {
    const props = { floodingOptions: [] };
    mountComponentWithProp(props);
    cy.assertByTestId('flooding-frequency-card');
  });

  it('should render values from flooding options as chips', () => {
    const props = { floodingOptions };
    mountComponentWithProp(props);

    floodingOptions.forEach((option, index) => {
      cy.assertByTestId(`flooding-options-chip-${index}`).should('have.text', option.label);
    });
  });

  it('should render values changed button when a flooding option is clicked', () => {
    const props = { floodingOptions };
    mountComponentWithProp(props);
    cy.assertByTestId('flooding-options-chip-0').first().click();
    cy.assertByTestId('values-changed-button');
  });
});
