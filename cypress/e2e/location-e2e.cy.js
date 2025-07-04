/* eslint-disable no-undef */

describe('Testing interactions on location screen', () => {
  beforeEach(() => {
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('get-a-recommendation-btn').first().click();
  });

  it('checks if plant-hardiness-dropdown has items equal to mapData.regions array', () => {
    cy.window().its('Storage').invoke('getState').its('mapData')
      .its('regions')
      .then((regions) => {
        const numberOfRegions = regions.length;
        cy.assertByTestId('plant-hardiness-zone-dropdown').click();
        cy.get('[role="listbox"]')
          .children()
          .should('have.length', numberOfRegions);
      });
  });
});
