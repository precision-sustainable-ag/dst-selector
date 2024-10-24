import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'cypress/react18';
import SoilDrainage from './SoilDrainage';
import configureStore from '../../../../reduxStore/store';

/* eslint-disable no-undef */

describe('<SoilDrainage />', () => {
  let reduxStore;
  let drainageOptions;
  beforeEach(() => {
    drainageOptions = [
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
    ];
    reduxStore = configureStore({});
    mount(
      <Provider store={reduxStore}>
        <SoilDrainage drainageOptions={drainageOptions} />
      </Provider>,
    );
  });

  it('should render the soil drainage card', () => {
    cy.assertByTestId('soil-drainage-card');
    cy.get('[datay-cy="drainage-reset-button"]').should('not.exist');
    cy.get('[data-test="tiling-check-switch"]').should('not.exist');
  });

  it('should render the reset button and tiling check switch when a drainage class chip is clicked', () => {
    for (let i = 0; i < 3; i++) {
      cy.assertByTestId(`drainage-class-chip-${i}`).click();
      cy.assertByTestId('tiling-check-switch');
      cy.assertByTestId('drainage-reset-button');
    }
  });
});
