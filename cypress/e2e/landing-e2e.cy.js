/* eslint-disable no-undef */

describe('Test all possible interactions on the Landing Page before a state is selected', () => {
  beforeEach(() => {
    cy.visit('');
    // Check for and click the "not now" button if it exists
    cy.contains(/not now/i).click({ multiple: true, force: true });
    // Check for and click the "decline" button if it exists
    cy.contains(/decline/i).click({ multiple: true, force: true });
  });

  it('should disabled get a recommendation andbrowse cover crops button if a state is not selected', () => {
    cy.assertByTestId('get-a-recommendation-btn').should('be.disabled');
    cy.assertByTestId('browse-cover-crops-btn').should('be.disabled');
  });
});

describe('Test all possible interactions on the Landing Page after a state is selected', () => {
  beforeEach(() => {
    cy.visit('');
    // Check for and click the "not now" button if it exists
    cy.contains(/not now/i).click({ multiple: true, force: true });
    // Check for and click the "decline" button if it exists
    cy.contains(/decline/i).click({ multiple: true, force: true });
  });

  it('should have correct states for the progress buttons after a state is selected', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('get-a-recommendation-btn').should('not.be.disabled');
    cy.assertByTestId('browse-cover-crops-btn').should('not.be.disabled');
  });

  it('should display correct logo when council changes', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    let councilShorthand = '';
    cy.window()
      .its('Storage')
      .invoke('getState')
      .then((state) => {
        councilShorthand = state.mapData.councilShorthand;
        cy.getByTestId('header_logo_button')
          .find('img')
          .invoke('attr', 'src')
          .should('equal', `images/${councilShorthand.toLowerCase()}_logo.png`);
      });
  });

  it('should navigate to explorer tab when a state is selected and browse cover crops button is clicked', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('browse-cover-crops-btn').first().click();
    cy.url().should('include', 'explorer');
  });
});
