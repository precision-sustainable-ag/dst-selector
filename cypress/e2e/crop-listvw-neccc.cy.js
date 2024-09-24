import { necccFilterTests } from '../support/e2e-neccc';

/* eslint-disable no-undef */

describe('Test all possible interactions on the NECCC Crop List View', () => {
  // before each test
  beforeEach(() => {
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-dropdown-item-22').click();
    cy.assertByTestId('next-btn').first().click();
    cy.assertByTestId('field-location-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('site-conditions-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('title-goals');
    cy.intercept('GET', '**/v1/states/36/crops?minimal=true&regions=3', {
      fixture: 'cropData-NECCC.json',
    }).as('apiRequest');
    cy.get("[data-cy='next-btn']").first().click().then(() => {
      cy.wait('@apiRequest');
    });
    cy.get("[data-cy='crop-list-btn']").first().click();
  });

  necccFilterTests();
});
