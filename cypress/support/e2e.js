/* eslint-disable no-undef */
import { flipCoverCropName } from '../../src/shared/constants';

Cypress.Commands.add('assertByTestId', (testId) => {
  cy.get(`[data-cy=${testId}]`).should('exist');
});

Cypress.Commands.add('beforeEachVisitBaseUrl', () => {
  cy.visit('');
  // Check for and click the "not now" button if it exists
  cy.contains(/not now/i).click({ multiple: true, force: true });
  // Check for and click the "decline" button if it exists
  cy.contains(/decline/i).click({ multiple: true, force: true });
});

const checkRows = (filterType, filterIndex, filterResult) => {
  const filterValType = typeof filterIndex[0];

  filterIndex.forEach((filterIdx, index) => {
    cy.assertByTestId(`"${filterType}-${filterIdx}"`)
      .click({ force: true }).then(() => {
        let option;
        if (filterValType === 'string' && index - 1 >= 0) {
          option = index - 1;
          cy.assertByTestId(`"${filterType}-${filterIndex[option]}"`).click({ force: true });
        } else if (filterValType === 'number') {
          option = filterIdx + 1;
          while (option <= filterIndex.length && option <= filterIndex.at(-1)) {
            cy.assertByTestId(`"${filterType}-${option}"`).click({ force: true });
            option += 1;
          }
        }
        cy.get('tbody').within(() => {
          cy.get('tr').then((allRows) => {
            cy.log(`Total rows found: ${allRows.length}`);
            if (allRows.length === 1) {
              // eslint-disable-next-line no-console
              console.log('One row found.');
              cy.contains(/No cover crops match your selected Cover Crop Property filters./i).should('exist');
            } else {
              const visibleRows = Cypress.$(allRows).not('[style*="opacity: 0.3"]');
              // eslint-disable-next-line no-console
              console.log(`Visible rows: ${visibleRows.length}`);
              if (filterResult[filterIdx] === 'all') {
                cy.get('tr[style*="opacity: 0.3"]').should('not.exist');
                return;
              }
              if (visibleRows.length <= 0) {
                cy.get('tr:not([style*="opacity: 0.3"])').should('not.exist');
                return;
              }
              expect(filterResult[filterIdx].length).to.equal(visibleRows.length);
              cy.wrap(visibleRows).each((row) => {
                cy.wrap(row)
                  .find('[data-cy="crop-calendar-crop-name"]').should('exist')
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
  cy.get(`[data-cy='${filterName}-checkbox']`)
    .should('be.visible')
    .click()
    .then(() => {
      cy.assertByTestId(`"${filterName}-row"`);
    });
};

export const mySelectedCropsCommonTests = () => {
  it('should indicate 3 crops added to my selected crops when top 3 crops are selected', () => {
    const btnIdx = [0, 1, 2];

    btnIdx.forEach((idx) => {
      cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
    });

    btnIdx.forEach((idx) => {
      cy.get(`[data-cy=delete-forever-icon-${idx}]`).should('exist');
      cy.get(`[data-cy=add-circle-outline-icon-${idx}]`).should('not.exist');
    });

    cy.get('[data-cy=badge] .MuiBadge-badge') // Select all badges
      .each(($badge) => {
        cy.wrap($badge).should('have.text', btnIdx.length); // Assert that each badge has the text '2'
      });
  });

  it('should display 3 cards in "My Selected Crops Screen", whose labels correspond to crop labels selected from table', () => {
    const btnIdx = [0, 1, 2];
    const cropLabels = [];
    const cardLabels = [];

    btnIdx.forEach((idx) => {
      cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      cy.get(`[data-cy=crop-row-${idx}]`).then(($row) => {
        cy.wrap($row)
          .find('[data-cy=crop-calendar-crop-name]')
          .should('be.visible')
          .then(($label) => {
            cropLabels.push($label.text());
          });
      });
    });

    cy.log('===CROP LABELS===', cropLabels);

    cy.get("[data-cy='next-btn']")
      .first()
      .click()
      .then(() => {
        btnIdx.forEach((idx) => {
          cy.assertByTestId(`crop-card-${idx}`);
        });
        cy.get('[data-cy^=crop-card-label-]').each(($label) => {
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

Cypress.Commands.add('testFilters', ({
  sidebarFilter, filterType, filterIndex, filterResult,
}) => {
  // const sidebarFilter = sidebarFilters[sideBarFilterIndex];
  // const filterType = filterTypes[filterTypeIndex];
  cy.assertByTestId(`"${sidebarFilter.toUpperCase()}-expandmore-icon"`).click({ force: true });
  checkRows(filterType, filterIndex, filterResult);
});

export const presenceOfFiltersTests = ({ sidebarFilters }) => {
  describe('Test for the presence of filters', () => {
    beforeEach(() => {
      const btnIdx = [0, 1, 2];
      btnIdx.forEach((idx) => {
        cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      });
      cy.get("[data-cy='next-btn']")
        .first()
        .click({ force: true })
        .then(() => {
          cy.get("[data-cy='comparison-view-btn']")
            .should('be.visible')
            .click();
        });
    });

    for (let i = 0; i < sidebarFilters.length; i++) {
      it(`should check if ${sidebarFilters[i]} is present along with its expandmore icon`, () => {
        cy.assertByTestId(`"${sidebarFilters[i]}"`);
        cy.assertByTestId(`"${sidebarFilters[i]}-expandmore-icon"`);
      });
    }
  });
};