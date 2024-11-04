import React from 'react';
import Header from './Header';

/* eslint-disable no-undef */

describe('Header Component', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('should have a GET A RECOMMENDATION button', () => {
    cy.assertByTestId('get-recommendation-btn').should('have.text', 'Get A Recommendation');
  });

  it('should have a BROWSE COVER CROPS button', () => {
    cy.assertByTestId('browse-covercrops-btn').should('have.text', 'BROWSE COVER CROPS');
  });

  it('should have correct navigation tabs and links', () => {
    const headerTabs = ['Profile', 'About', 'Help', 'Feedback', 'Release Notes'];
    cy.getByTestId('open_menu').click();

    headerTabs.forEach((tab) => {
      cy.getByTestId(`navbar-${tab}`).should('exist');
    });
    cy.getByTestId('auth_button').should('have.text', 'LOGIN');
  });

  it('should initially display PSA logo', () => {
    cy.assertByTestId('header_logo_button').find('img').invoke('attr', 'src').should('equal', 'images/PSA_logo.png');
  });
});
