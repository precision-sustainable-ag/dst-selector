// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { Provider } from 'react-redux';
import configureStore from '../../src/reduxStore/store'
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
import { BrowserRouter } from 'react-router-dom';

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

Cypress.Commands.add("assertByTestId", (testId) => {
    cy.get(`[data-cy=${testId}]`).should('exist');
})

// Example use:
// cy.mount(<MyComponent />)