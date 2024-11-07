/* eslint-disable no-undef */

describe('Test all possible interactions on the Landing Page before a state is selected', () => {
  beforeEach(() => {
    cy.visit('');
    // Check for and click the "not now" button if it exists
    cy.contains(/not now/i).click({ multiple: true, force: true });
    // Check for and click the "decline" button if it exists
    cy.contains(/decline/i).click({ multiple: true, force: true });
  });

  it('should render disabled browse cover crops button if a state is not selected', () => {
    cy.assertByTestId('browse-covercrops-btn').should('be.disabled');
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

  it('should display the correct welcome message when a state is selected from the state dropdown', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    let councilLabel = '';
    cy.window()
      .its('Storage')
      .invoke('getState')
      .then((state) => {
        councilLabel = state.mapData.councilLabel;
        cy.contains(`Welcome to the ${councilLabel} Species Selector`).should('exist');
      });
  });

  it('should have correct states for the progress buttons after a state is selected', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('next-btn').should('not.be.disabled');
    cy.assertByTestId('back-btn').should('be.disabled');
    cy.assertByTestId('restart-btn').should('be.disabled');
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
    cy.assertByTestId('browse-covercrops-btn').click();
    cy.url().should('include', 'explorer');
  });
});
