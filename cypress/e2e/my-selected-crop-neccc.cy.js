import { mySelectedCropsCommonTests } from '../support/e2e';
import { checkForFiltersNECCC, necccComparisonRowTests } from '../support/e2e-neccc';

/* eslint-disable no-undef */

describe('Test for adding a crop to cart and viewing the crop in "My Selected Crops" screen for NECCC region', () => {
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
  });

  checkForFiltersNECCC();
  mySelectedCropsCommonTests();
  necccComparisonRowTests();
});
