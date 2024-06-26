import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import ProgressButtons from './ProgressButtons';
import configureStore from '../reduxStore/store';
import { setMapRedux } from '../reduxStore/mapSlice';
import { gotoProgress } from '../reduxStore/sharedSlice';
import { setAddressRedux } from '../reduxStore/addressSlice';

/* eslint-disable no-undef */

describe('<ProgressButtonsInner />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({
      mapData: {
        regions: [],
        regionId: null,
        regionShorthand: null,
        stateId: null,
        stateLabel: null,
        councilShorthand: null,
        councilLabel: null,
      },
      sharedData: {
        progress: 0,
      },
      addressData: {
        address: '',
      },
    });
  });

  it('renders correct state of Progress buttons when progress is 0', () => {
    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );

    cy.assertByTestId('back-prgs-btn').should('be.disabled');
    cy.assertByTestId('next-prgs-btn').should('be.disabled');
    cy.assertByTestId('refresh-prgs-btn').should('be.disabled');
  });

  it('should enable next button when a state is selected and progress is 0', () => {
    const mapData = {
      regions: [
        {
          id: 1,
          label: 'Zone 4',
          shorthand: '4',
          localityId: 2,
          createdAt: '2023-01-23T12:28:46.665Z',
          updatedAt: '2023-01-23T12:28:46.665Z',
          deletedAt: null,
        },
        {
          id: 2,
          label: 'Zone 5',
          shorthand: '5',
          localityId: 2,
          createdAt: '2023-01-23T12:28:46.665Z',
          updatedAt: '2023-01-23T12:28:46.665Z',
          deletedAt: null,
        },
        {
          id: 3,
          label: 'Zone 6',
          shorthand: '6',
          localityId: 2,
          createdAt: '2023-01-23T12:28:46.665Z',
          updatedAt: '2023-01-23T12:28:46.665Z',
          deletedAt: null,
        },
        {
          id: 4,
          label: 'Zone 7',
          shorthand: '7',
          localityId: 2,
          createdAt: '2023-01-23T12:28:46.665Z',
          updatedAt: '2023-01-23T12:28:46.665Z',
          deletedAt: null,
        },
      ],
      regionId: 1,
      regionShorthand: '4',
      stateId: 36,
      stateLabel: 'New York',
      councilShorthand: 'NECCC',
      councilLabel: 'Northeast Cover Crops Council',
    };
    reduxStore.dispatch(setMapRedux(mapData));

    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );

    cy.assertByTestId('back-prgs-btn').should('be.disabled');
    cy.assertByTestId('next-prgs-btn').should('not.be.disabled');
    cy.assertByTestId('refresh-prgs-btn').should('be.disabled');
  });

  it('renders correct state of Progress buttons when progress is 1', () => {
    const addressData = {
      address: '170 State Street',
    };
    reduxStore.dispatch(setAddressRedux(addressData));
    reduxStore.dispatch(gotoProgress(1));

    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );
    cy.assertByTestId('back-prgs-btn').should('not.be.disabled');
    cy.assertByTestId('next-prgs-btn').should('not.be.disabled');
    cy.assertByTestId('refresh-prgs-btn').should('not.be.disabled');
  });

  it('renders correct state of Progress buttons when progress is 2', () => {
    reduxStore.dispatch(gotoProgress(2));

    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );
  });

  it('renders correct state of Progress buttons when progress is 3', () => {
    reduxStore.dispatch(gotoProgress(3));

    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );
  });

  it('renders correct state of Progress buttons when progress is 4', () => {
    reduxStore.dispatch(gotoProgress(4));

    mount(
      <Provider store={reduxStore}>
        <ProgressButtons />
      </Provider>,
    );
    cy.assertByTestId('back-prgs-btn').should('not.be.disabled');
    cy.assertByTestId('next-prgs-btn').should('have.text', 'MY SELECTED CROPS').should('be.disabled');
    cy.assertByTestId('refresh-prgs-btn').should('not.be.disabled');
  });
});
