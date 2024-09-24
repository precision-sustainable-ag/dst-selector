import { scccFilterTests } from '../support/e2e-sccc';

/* eslint-disable no-undef */

describe('Test all possible interactions on the SCCC Crop Calendar Page', () => {
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
  });

  // it('should highlight rows of searched crops', () => {
  //   const searchTerm = 'oil';
  //   cy.assertByTestId('crop-search-input').type(searchTerm);
  //   cy.get('tbody').within(() => {
  //     cy.get('tr').not('[style*="opacity: 0.3"]').each(($row) => {
  //       cy.wrap($row)
  //         .find('[data-cy="crop-calendar-crop-name"]').should('exist')
  //         .then(($label) => {
  //           expect($label.text().trim().toLowerCase()).to.include(searchTerm.toLowerCase());
  //         });
  //     });
  //   });
  // });

  scccFilterTests();
});
