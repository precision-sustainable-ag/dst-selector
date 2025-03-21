/* eslint-disable */
import './commands';
import { flipCoverCropName } from '../../src/shared/constants';

const rowOpacity = 0.55;

export const testFiltersByType = () => {
  const cropData = Cypress.env('cropData');
  const filterTypes = Cypress.env('filterTypes');
  const allFilters = Cypress.env('allFilters');

  const allFilterDataTypes = allFilters.reduce((res, filter) => {
    const dataType = filter.dataType.label;
    if (res.includes(dataType)) return res;
    return [...res, dataType];
  }, []);

  const testFilters = allFilterDataTypes.reduce((res, dataType) => {
    // TODO: for each filter type, find first available filter
    const filterName = allFilters.find((filter) => filter.dataType.label === dataType)?.label;
    if (!filterName) return res;
    return [...res, filterName];
  }, []);

  const testFilterValues = allFilterDataTypes.reduce((res, dataType) => {
    const filter = allFilters.find((filter) => filter.dataType.label === dataType);
    if (!filter) return res;
    return [...res, filter.values.map((v) => (v.dataType === 'number' && filter.dataType.label !== 'currency' ? parseInt(v.value) : v.value))];
  }, []);

  const filterResults = {};
  testFilters.forEach((filter, i) => {
    const result = {};
    testFilterValues[i].forEach((value) => {
      result[value] = [];
    });
    cropData.forEach((crop) => {
      const attr = crop.attributes.find((attr) => attr.label === filter);
      if (attr) {
        attr.values.forEach((val) => {
          const { value } = val;
          result[value] = [...result[value], flipCoverCropName(crop.label)];
        });
      }
    });
    filterResults[filter] = result;
  });

  cy.log(filterTypes, allFilterDataTypes, testFilters, testFilterValues, filterResults);

  filterTypes.forEach((filterType) => {
    cy.getByTestId(`${filterType.toUpperCase()}-expandmore-icon`).click();
  });

  testFilters.forEach((filter, i) => {
    checkRows(filter, testFilterValues[i], filterResults[filter]);
    cy.getByTestId('crop-side-bar-clear-filters').click();
  });
};

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
