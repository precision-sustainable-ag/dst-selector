import { sidebarFilters, filterTypes } from '../../src/test-data/neccc';
import { mySelectedCropsCommonTests } from '../support/e2e';

/* eslint-disable no-undef */

describe('Test for adding a crop to cart and viewing the crop in "My Selected Crops" screen for NECCC region', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept({ url: 'https://api.mapbox.com/**' }, { log: false });
    cy.intercept({ url: 'https://events.mapbox.com/**' }, { log: false });
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-22').click();
    cy.getByTestId('state-selector-dropdown').first().find('input').should('have.value', 'NY');
    cy.getByTestId('next-btn').first().click();
    cy.assertByTestId('field-location-title');

    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_LOCATION',
      payload: { address: '170 State Street', markers: [[42.652843, -73.757874]], county: 'Albany County' },
    });
    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_REGION',
      payload: { regionId: 3, regionShorthand: '6' },
    });

    cy.getByTestId('next-btn').first().should('not.be.disabled').click();
    cy.assertByTestId('site-conditions-title');
    cy.get("[data-test='next-btn']").first().click();
    cy.assertByTestId('title-goals');
    cy.intercept('GET', '**/v1/states/36/crops?minimal=true&regions=3', {
      fixture: 'cropData-NECCC.json',
    }).as('apiRequest');
    cy.get("[data-test='next-btn']").first().click().then(() => {
      cy.wait('@apiRequest');
    });
  });

  mySelectedCropsCommonTests();

  describe('tests for comparison view comparisons', () => {
    // TODO: these tests are using constants, MIGHT need to change?
    beforeEach(() => {
      // select top 3 crops and go to My Select Crops page, open all accordions
      const btnIdx = [0, 1, 2];
      btnIdx.forEach((idx) => {
        cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      });
      cy.get("[data-test='my selected crops-btn']")
        .first()
        .click({ force: true })
        .then(() => {
          cy.get("[data-test='comparison-view-btn']")
            .should('be.visible')
            .click();
        });

      for (let i = 0; i < sidebarFilters.length; i++) {
        // eslint-disable-next-line no-continue
        if (sidebarFilters[i] === 'SOIL CONDITIONS') continue;
        cy.assertByTestId(`"${sidebarFilters[i]}"`);
        cy.assertByTestId(`"${sidebarFilters[i]}-expandmore-icon"`).click();
      }
    });

    it('should show all filters and comparisons', () => {
      for (let i = 0; i <= 28; i++) {
        // eslint-disable-next-line no-continue
        if (i === 17) continue;

        cy.get(`[data-test='${filterTypes[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.assertByTestId(`"${filterTypes[i]}-row"`);
          });

        cy.get(`[data-test='${filterTypes[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.get(`[data-test="${filterTypes[i]}-row"]`).should('not.exist');
          });
      }
    });

    it('should be able to use Show All and Clear Variables button to control comparisons', () => {
      cy.getByTestId('my-selected-crops-show-all').click();
      for (let i = 0; i <= 28; i++) {
        // eslint-disable-next-line no-continue
        if (i === 17) continue;
        cy.assertByTestId(`"${filterTypes[i]}-row"`);
      }
      cy.getByTestId('my-selected-crops-clear-variables').click();
      for (let i = 0; i <= 28; i++) {
        // eslint-disable-next-line no-continue
        if (i === 17) continue;
        cy.getByTestId(`"${filterTypes[i]}-row"`).should('not.exist');
      }
    });
  });
});
