import { mwcccFilterTests } from '../support/e2e-mwccc';

/* eslint-disable no-undef */

describe('Test all possible interactions on the MWCCC Crop List View', () => {
  // before each test
  beforeEach(() => {
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-dropdown-item-18').click();
    cy.assertByTestId('next-btn').first().click();
    cy.assertByTestId('field-location-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('site-conditions-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('title-goals');
    cy.intercept('GET', '**/v1/states/29/crops?minimal=true&regions=676', {
      fixture: 'cropData-MWCCC.json',
    }).as('apiRequest');
    cy.get("[data-cy='next-btn']").first().click().then(() => {
      cy.wait('@apiRequest');
    });
    cy.get("[data-cy='crop-list-btn']").first().click();
  });

  mwcccFilterTests();
});
