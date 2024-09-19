import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import configureStore from '../../src/reduxStore/store';
import './commands';

/* eslint-disable no-undef */

Cypress.Commands.add('mount', (component, options = {}) => {
  const { reduxStore = configureStore(), ...mountOptions } = options;

  cy.window().then((win) => {
    win.document.getElementById = cy.stub().withArgs('favicon').returns({ href: '' });
  });

  const wrapped = (
    <Provider store={reduxStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );

  return mount(wrapped, mountOptions);
});

Cypress.Commands.add('assertByTestId', (testId) => {
  cy.get(`[data-cy=${testId}]`).should('exist');
});

// Example use:
// cy.mount(<MyComponent />)
