/* eslint-disable */
/* eslint-disable no-undef */
import './commands';

const rowOpacity = 0.55;

Cypress.Commands.add('assertByTestId', (testId) => {
  cy.get(`[data-test=${testId}]`).should('exist');
});

Cypress.Commands.add('beforeEachVisitBaseUrl', () => {
  cy.visit('');
  // Check for and click the "not now" button if it exists
  cy.contains(/not now/i).click({ multiple: true, force: true });
  // Check for and click the "decline" button if it exists
  cy.contains(/decline/i).click({ multiple: true, force: true });
});

export const testFiltersByType = (filterTypes, testFilters, testFilterValues, filterResults) => {
  for (let i = 0; i < filterTypes.length; i++) {
    cy.getByTestId(`${filterTypes[i].toUpperCase()}-expandmore-icon`).click();
  }
  // checkRows(testFilters[3], testFilterValues[3], filterResults[testFilters[3]]);

  testFilters.forEach((filter, i) => {
    checkRows(filter, testFilterValues[i], filterResults[filter]);
    cy.getByTestId('crop-side-bar-clear-filters').click();
  });
};

Cypress.Commands.add('testFilters', ({
  // eslint-disable-next-line no-unused-vars
  sidebarFilter, filterType, filterIndex, filterResult,
}) => {
  // cy.assertByTestId(`"${sidebarFilter.toUpperCase()}-expandmore-icon"`).click({ force: true });
  // eslint-disable-next-line no-use-before-define
  checkRows(filterType, filterIndex, filterResult);
  cy.getByTestId('crop-side-bar-clear-filters').click();
});

const checkRows = (filterType, filterIndex, filterResult) => {
  const filterValType = typeof filterIndex[0];

  filterIndex.forEach((filterIdx, index) => {
    cy.getByTestId(`${filterType}-${filterIdx}`)
      .click({ force: true }).then(() => {
        let option;
        if (filterValType === 'string' && index - 1 >= 0) {
          option = index - 1;
          cy.getByTestId(`${filterType}-${filterIndex[option]}`).click({ force: true });
        } else if (filterValType === 'number') {
          option = filterIdx + 1;
          // click on rest of the chips to unselect them
          while (option <= filterIndex.length && option <= filterIndex.at(-1)) {
            cy.getByTestId(`${filterType}-${option}`).click({ force: true });
            option += 1;
          }
        }
        cy.get('[data-test="crop-list-tbody"]').within(() => {
          cy.get('[data-test^="crop-list-tr"]').then((allRows) => {
            cy.log(`Total rows found: ${allRows.length}`);
            if (allRows.length === 1) {
              // eslint-disable-next-line no-console
              cy.log('One row found.');
              cy.contains(/No cover crops match your selected Cover Crop Property filters./i).should('exist');
            } else {
              const visibleRows = Cypress.$(allRows).not(`[style*="opacity: ${rowOpacity}"]`);
              // eslint-disable-next-line no-console
              cy.log(`Visible rows: ${visibleRows.length}`);
              if (filterResult[filterIdx] === 'all') {
                cy.get(`tr[style*="opacity: ${rowOpacity}"]`).should('not.exist');
                return;
              }
              if (visibleRows.length <= 0) {
                cy.get(`tr:not([style*="opacity: ${rowOpacity}"])`).should('not.exist');
                return;
              }
              expect(filterResult[filterIdx].length).to.equal(visibleRows.length);
              cy.wrap(visibleRows).each((row) => {
                cy.wrap(row)
                  .find('[data-test="crop-calendar-crop-name"]')
                  .then((label) => {
                    expect(filterResult[filterIdx]).to.include(label.text());
                  });
              });
            }
          });
        });
      });
  });
};
