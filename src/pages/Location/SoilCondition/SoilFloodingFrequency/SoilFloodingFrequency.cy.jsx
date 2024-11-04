import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import SoilFloodingFrequency from './SoilFloodingFrequency';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<SoilFloodingFrequency />', () => {
  let reduxStore;
  const floodingOptions = [
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
