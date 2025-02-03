/* eslint-disable no-undef */
import { flipCoverCropName } from '../../src/shared/constants';
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
                  .find('[data-test="crop-calendar-crop-name"]').should('exist')
                  .then((label) => {
                    expect(filterResult[filterIdx]).to.include(label.text().trim().toLowerCase());
                  });
              });
            }
          });
        });
      });
  });
};

export const checkComparisonTableRows = ({ filterName }) => {
  cy.get(`[data-test='${filterName}-checkbox']`)
    .click()
    .then(() => {
      cy.assertByTestId(`"${filterName}-row"`);
    });

  cy.get(`[data-test='${filterName}-checkbox']`)
    .click()
    .then(() => {
      cy.get(`[data-test="${filterName}-row"]`).should('not.exist');
    });
};

export const mySelectedCropsCommonTests = () => {
  it('should display selected crops number on My Select Crops tab and show corresponding crop cards in My Selected Crops', () => {
    const btnIdx = [0, 1, 2];
    const cropLabels = [];
    const cardLabels = [];

    btnIdx.forEach((idx) => {
      cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      cy.get(`[data-test=crop-list-tr-${idx}]`).then(($row) => {
        cy.wrap($row)
          .find('[data-test=crop-calendar-crop-name]')
          .should('be.visible')
          .then(($label) => {
            cropLabels.push($label.text());
          });
      });
    });

    btnIdx.forEach((idx) => {
      cy.get(`[data-test=delete-forever-icon-${idx}]`).should('exist');
      cy.get(`[data-test=add-circle-outline-icon-${idx}]`).should('not.exist');
    });

    cy.get('[data-test=badge] .MuiBadge-badge') // Select all badges
      .each(($badge) => {
        cy.wrap($badge).should('have.text', btnIdx.length); // Assert that each badge has the text '2'
      });

    cy.log('===CROP LABELS===', cropLabels);

    cy.get("[data-test='my selected crops-btn']")
      .first()
      .click()
      .then(() => {
        btnIdx.forEach((idx) => {
          cy.assertByTestId(`crop-card-${idx}`);
        });
        cy.get('[data-test^=crop-card-label-]').each(($label) => {
          // Ensure the label is visible
          cy.wrap($label).should('be.visible')
            .invoke('text')
            .then((labelText) => {
              cardLabels.push(flipCoverCropName(labelText));
              cy.log(`Crop Card Label: ${labelText}`);
            });
        })
          .then(() => {
            cy.log('=== CARD LABELS===', cardLabels);
            expect(cropLabels.length).to.equal(cardLabels.length);
            btnIdx.forEach((idx) => {
              expect(cropLabels[idx].trim().toLowerCase()).to.equal(cardLabels[idx].trim().toLowerCase());
            });
          });
      });
  });
};

export const presenceOfFiltersTests = (sidebarFilters) => {
  it('should have presence of all the filters', () => {
    const btnIdx = [0, 1, 2];
    btnIdx.forEach((idx) => {
      cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
    });
    cy.get("[data-test='my selected crops-btn']")
      .first()
      .click({ force: true })
      .then(() => {
        cy.get("[data-test='comparison-view-btn']")
          .should('be.visible')
          .click();
      });

    for (let i = 0; i < sidebarFilters.length; i++) {
      // eslint-disable-next-line no-continue
      if (sidebarFilters[i] === 'SOIL CONDITIONS') continue;
      cy.assertByTestId(`"${sidebarFilters[i]}"`);
      cy.assertByTestId(`"${sidebarFilters[i]}-expandmore-icon"`);
    }
  });
};
