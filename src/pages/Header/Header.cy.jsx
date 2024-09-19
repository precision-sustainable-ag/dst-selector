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
    const headerTabs = ['profile', 'about', 'help', 'feedback'];

    headerTabs.forEach((tab) => {
      cy.contains(new RegExp(`${tab}`, 'i'));
      cy.log(`Checking tab: ${tab}`);
      if (tab === 'help') {
        cy.assertByTestId(tab).should('be.disabled').find('a').should('have.attr', 'href', `/${tab}`);
      } else {
        // Click on the tab except for 'help'
        cy.assertByTestId(tab)
          .find('a').should('have.attr', 'href', `/${tab}`);
      }
    });
  });

  it('should display auth button correctly', () => {
    cy.assertByTestId('auth-btn').should('have.text', 'Login');
  });

  it('should initially display PSA logo', () => {
    cy.assertByTestId('logo-image').invoke('attr', 'src').should('equal', '/images/PSAlogo-text.png');
  });
});
