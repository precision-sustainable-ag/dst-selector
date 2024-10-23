// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* eslint-disable no-undef */

Cypress.Commands.add('getByTestId', (testId, ...args) => {
  cy.get(`[data-cy=${testId}]`, ...args);
});

Cypress.Commands.add('loginToAuth0', () => {
  const args = { username: Cypress.env('auth0_username'), password: Cypress.env('auth0_password') };
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${args.username}`],
    // @ts-ignore
    autoEnd: false,
  });
  log.snapshot('before');

  cy.session(
    `auth0-${args.username}`,
    () => {
      // App landing page redirects to Auth0.
      cy.visit('/');
      cy.contains(/not now/i).click({ multiple: true, force: true });
      cy.contains(/decline/i).click({ multiple: true, force: true });
      cy.getByTestId('auth-btn').click();

      // Login on Auth0.
      cy.origin(Cypress.env('auth0_domain'), { args }, ({ username, password }) => {
        cy.get('input#username').type(username);
        cy.get('input#password').type(password);
        cy.contains('button[value=default]', 'Continue').click();
      });

      // Ensure Auth0 has redirected us back to the RWA.
      cy.url().should('equal', Cypress.config().baseUrl);
    },
  );

  log.snapshot('after');
  log.end();
});

Cypress.Commands.add('getReduxState', () => cy.window().its('store').invoke('getState'));
