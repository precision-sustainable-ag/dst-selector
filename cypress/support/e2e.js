import './commands';

const rowOpacity = 0.55;

export const testFiltersByType = () => {
  cy.window()
    .its('store')
    .then((store) => {
      const council = store.getState().mapData.councilShorthand;
      const cropData = Cypress.env('cropData');
      const filterTypes = Cypress.env('filterTypes');
      const allFilters = Cypress.env('allFilters');

      const validFilters = allFilters.filter((filter) => {
        const hasValues = filter.values?.some((v) => v.value !== null && v.value !== undefined);
        return hasValues;
      });

      const testFilters = validFilters.map((filter) => filter.label);

      const testFilterValues = validFilters.map((filter) => {
        let vals = filter.values
          .filter((v) => v.value !== null && v.value !== undefined)
          .map((v) =>
            v.dataType === 'number' && filter.dataType.label !== 'currency'
              ? parseInt(v.value, 10)
              : v.value,
          );
        if (typeof vals[0] === 'number') {
          if (council === 'MCCC') {
            vals = vals.filter((v) => v <= 4);
          }
          return vals.reverse();
        }
        return vals;
      });

      const filterResults = {};
      testFilters.forEach((filter, i) => {
        const result = {};
        const isNumericFilter = typeof testFilterValues[i][0] === 'number';
        const maxValidRating = isNumericFilter ? Math.max(...testFilterValues[i]) : null;
        testFilterValues[i].forEach((targetVal) => {
          result[targetVal] = [];
        });

        cropData.forEach((crop) => {
          const attr = crop.attributes.find((a) => a.label === filter);
          if (attr) {
            const displayName = council === 'WCCC' ? crop.label.trim() : crop.label.trim();

            testFilterValues[i].forEach((targetVal) => {
              const matches = attr.values.some((val) => {
                if (val.value === null || val.value === undefined) return false;
                if (isNumericFilter) {
                  const num = Number(val.value);
                  return num <= maxValidRating && num >= targetVal;
                }
                return val.value === targetVal;
              });

              if (matches && !result[targetVal].includes(displayName)) {
                result[targetVal].push(displayName);
              }
            });
          }
        });
        filterResults[filter] = result;
      });

      cy.log(filterTypes, testFilters, testFilterValues, filterResults);

      filterTypes.forEach((filterType) => {
        cy.getByTestId(`${filterType.toUpperCase()}-expandmore-icon`).click();
      });

      testFilters.forEach((filter, i) => {
        checkRows(filter, testFilterValues[i], filterResults[filter]);
        cy.getByTestId('crop-side-bar-clear-filters').click();
      });
    });
};

const checkRows = (filterType, filterIndex, filterResult) => {
  const filterValType = typeof filterIndex[0];

  filterIndex.forEach((filterIdx, index) => {
    cy.getByTestId(`${filterType}-${filterIdx}`)
      .click({ force: true })
      .then(() => {
        if ((filterValType === 'string' || filterValType === 'boolean') && index - 1 >= 0) {
          const prevOption = filterIndex[index - 1];
          cy.getByTestId(`${filterType}-${prevOption}`).click({ force: true });
        }
        cy.get('[data-test="crop-list-tbody"]').within(() => {
          cy.get('[data-test^="crop-list-tr"]').then((allRows) => {
            cy.log(`Total rows found: ${allRows.length}`);
            if (allRows.length === 1) {
              // eslint-disable-next-line no-console
              cy.log('One row found.');
              cy.contains(
                /No cover crops match your selected Cover Crop Property filters./i,
              ).should('exist');
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
              const actualCropNames = visibleRows
                .find('[data-test="crop-calendar-crop-name"]')
                .map((_, el) => Cypress.$(el).text().trim())
                .get();
              expect(actualCropNames.sort()).to.deep.equal([...filterResult[filterIdx]].sort());
            }
          });
        });
      });
  });
};
