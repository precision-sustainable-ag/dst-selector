import React from 'react';
import Location from './Location';

/* eslint-disable no-undef */

describe('<Location />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Location />);
  });
});
