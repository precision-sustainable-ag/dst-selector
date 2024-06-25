describe('template spec', () => {
  beforeEach(() => {
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId("state-selector-dropdown").first().click();
    cy.assertByTestId("state-dropdown-item-0").click();
    cy.assertByTestId('next-prgs-btn').first().click();
  });

  it('should run', () => {
    cy.contains(/location/i).should('exist');
  });
})