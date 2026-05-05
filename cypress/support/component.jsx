import './commands';
import { ThemeProvider } from '@mui/material';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { dstTheme } from '../../src/App';
import configureStore from '../../src/reduxStore/store';
import { Auth0Context } from '@auth0/auth0-react';

/* eslint-disable no-undef */

Cypress.Commands.add('mount', (component, options = {}) => {
  const { reduxStore = configureStore(), ...mountOptions } = options;

  cy.window().then((win) => {
    win.document.getElementById = cy.stub().withArgs('favicon').returns({ href: '' });
  });

  const auth0Value = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    getAccessTokenSilently: cy.stub().resolves('mock-token'),
    loginWithRedirect: cy.stub(),
    logout: cy.stub(),
  };

  const wrapped = (
    <Auth0Context.Provider value={auth0Value}>
      <Provider store={reduxStore}>
        <ThemeProvider theme={dstTheme}>
          <BrowserRouter>{component}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Auth0Context.Provider>
  );

  return mount(wrapped, mountOptions);
});

Cypress.Commands.add('assertByTestId', (testId) => {
  cy.get(`[data-test=${testId}]`).should('exist');
});

// Example use:
// cy.mount(<MyComponent />)
