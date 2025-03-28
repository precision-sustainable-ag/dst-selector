import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import configureStore from '../../src/reduxStore/store';
import { dstTheme } from '../../src/App';
import './commands';

/* eslint-disable no-undef */

Cypress.Commands.add('mount', (component, options = {}) => {
  const { reduxStore = configureStore(), ...mountOptions } = options;

  cy.window().then((win) => {
    win.document.getElementById = cy.stub().withArgs('favicon').returns({ href: '' });
  });

  const wrapped = (
    <Provider store={reduxStore}>
      <ThemeProvider theme={dstTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  return mount(wrapped, mountOptions);
});

Cypress.Commands.add('assertByTestId', (testId) => {
  cy.get(`[data-test=${testId}]`).should('exist');
});

// Example use:
// cy.mount(<MyComponent />)
