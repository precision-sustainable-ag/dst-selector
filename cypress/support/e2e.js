Cypress.Commands.add("assertByTestId", (testId) => {
    cy.get(`[data-cy=${testId}]`).should('exist');
});

Cypress.Commands.add("beforeEachVisitBaseUrl", () => {
    cy.visit('');
    // Check for and click the "not now" button if it exists
    cy.contains(/not now/i).click({ multiple: true, force: true });
    // Check for and click the "decline" button if it exists
    cy.contains(/decline/i).click({ multiple: true, force: true });
});