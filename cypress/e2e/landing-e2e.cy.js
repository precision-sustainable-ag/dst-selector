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

  it('should navigate to correct urls from the navigation tab', () => {
    const headerTabs = ['profile', 'about', 'help', 'feedback'];

    headerTabs.forEach((tab) => {
      cy.contains(new RegExp(`${tab}`, 'i'));
      cy.log(`Checking tab: ${tab}`);
      if (tab === 'help') {
        cy.assertByTestId(tab).should('be.disabled');
      } else {
        // Click on the tab except for 'help'
        cy.assertByTestId(tab).click();
        cy.url().should('include', `/${tab}`);
      }
    });
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
    cy.window().its('Storage').invoke('getState').then((state) => {
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
    cy.window().its('Storage').invoke('getState').then((state) => {
      councilShorthand = state.mapData.councilShorthand;
      cy.getByTestId('header-logo').find('img').invoke('attr', 'src').should('equal', `images/${councilShorthand.toLowerCase()}_logo.png`);
    });
  });

  it('should enable help button once a state is selected', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('help').should('not.be.disabled').click();
    cy.url().should('include', 'help');
  });

  it('should navigate to explorer tab when a state is selected and browse cover crops button is clicked', () => {
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.assertByTestId('state-selector-dropdown-ALABAMA').click();
    cy.assertByTestId('browse-covercrops-btn').click();
    cy.url().should('include', 'explorer');
  });
});
