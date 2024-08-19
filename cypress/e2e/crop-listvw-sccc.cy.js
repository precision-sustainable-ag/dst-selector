import { scccFilterTests } from '../support/e2e-sccc';

/* eslint-disable no-undef */

describe('Tst all possible interactions on the SCCC Crop List View', () => {
  beforeEach(() => {
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-dropdown-item-0').click();
    cy.assertByTestId('next-btn').first().click();
    cy.assertByTestId('field-location-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('site-conditions-title');
    cy.get("[data-cy='next-btn']").first().click();
    cy.assertByTestId('title-goals');
    cy.intercept('GET', '**/v1/states/5/crops?minimal=true&regions=60', {
      fixture: 'cropData-SCCC.json',
    }).as('apiRequest');
    cy.get("[data-cy='next-btn']").first().click().then(() => {
      cy.wait('@apiRequest');
    });
    cy.get("[data-cy='crop-list-btn']").first().click();
  });

  scccFilterTests();
});
