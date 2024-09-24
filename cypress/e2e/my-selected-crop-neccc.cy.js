import { sidebarFilters, filterTypes } from '../../src/test-data/neccc';
import { mySelectedCropsCommonTests } from '../support/e2e';

/* eslint-disable no-undef */

describe('Test for adding a crop to cart and viewing the crop in "My Selected Crops" screen for NECCC region', () => {
  beforeEach(() => {
    cy.intercept({ url: 'https://api.mapbox.com/**' }, { log: false });
    cy.intercept({ url: 'https://events.mapbox.com/**' }, { log: false });
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-dropdown-item-22').click();
    cy.getByTestId('state-selector-dropdown').first().find('input').should('have.value', 'NY');
    cy.getByTestId('next-btn').first().should('not.be.disabled').click();
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

  mySelectedCropsCommonTests();

  describe('tests for comparison view comparisons', () => {
    // TODO: these tests are using constants, MIGHT need to change?
    beforeEach(() => {
      // select top 3 crops and go to My Select Crops page, open all accordions
      const btnIdx = [0, 1, 2];
      btnIdx.forEach((idx) => {
        cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      });
      cy.get("[data-cy='my selected crops-btn']")
        .first()
        .click({ force: true })
        .then(() => {
          cy.get("[data-cy='comparison-view-btn']")
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

        cy.get(`[data-cy='${filterTypes[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.assertByTestId(`"${filterTypes[i]}-row"`);
          });

        cy.get(`[data-cy='${filterTypes[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.get(`[data-cy="${filterTypes[i]}-row"]`).should('not.exist');
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
