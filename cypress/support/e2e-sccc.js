import { sidebarFilters, filterResult, filterTypes } from '../../src/test-data/sccc';
import { checkComparisonTableRows, presenceOfFiltersTests } from './e2e';

/* eslint-disable no-undef */

export const scccFilterTests = () => {
  it('should filter correct crops on Drought Tolerance filter options', () => {
    const filterType = filterTypes[0];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Flood Tolerance filter options', () => {
    const filterType = filterTypes[1];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Heat Tolerance filter options', () => {
    const filterType = filterTypes[2];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Salinity Tolerance filter options', () => {
    const filterType = filterTypes[3];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Shade Tolerance filter options', () => {
    const filterType = filterTypes[4];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // growth traits
  it('should filter correct crops on Duration filter options', () => {
    const filterType = filterTypes[5];
    const filterIndex = ['Annual', 'Biennial', 'Perennial', 'Short-lived Perennial'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Ease Of Establishment filter options', () => {
    const filterType = filterTypes[6];
    const filterIndex = [1, 2, 3, 4, 5];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Establishes Quickly filter options', () => {
    const filterType = filterTypes[7];
    const filterIndex = [1, 2, 3, 4, 5];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Flowering Trigger filter options', () => {
    const filterType = filterTypes[8];
    const filterIndex = ['Intermediate Day', 'Long Day', 'Plant Size', 'Short Day', 'Vernalization'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Potential Relative Biomass Accum filter options', () => {
    const filterType = filterTypes[9];
    const filterIndex = ['High', 'Low', 'Medium'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Root Architecture filter options', () => {
    const filterType = filterTypes[10];
    const filterIndex = ['Fibrous', 'Tap'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Root Depth filter options', () => {
    const filterType = filterTypes[11];
    const filterIndex = ['Deep', 'Medium', 'Shallow'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Shape & Orientation filter options', () => {
    const filterType = filterTypes[12];
    const filterIndex = ['Climbing', 'Erect', 'Prostrate', 'Semi-Erect'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // soil conditions
  it('should filter correct crops on Soil Moisture Use filter options', () => {
    const filterType = filterTypes[13];
    const filterIndex = ['High', 'Low', 'Medium'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Success under Low Nutrient Levels filter options', () => {
    const filterType = filterTypes[14];
    const filterIndex = [1, 2, 3, 4, 5];

    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Supports Mycorrhizae filter options', () => {
    const filterType = filterTypes[15];
    const filterIndex = [1, 2, 3, 4, 5];

    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // planting

  it('should filter correct crops on Early Spring Growth filter options', () => {
    const filterType = filterTypes[17];
    const filterIndex = [1, 2, 3, 4, 5];

    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Seed Price per Pound filter options', () => {
    const filterType = filterTypes[19];
    const filterIndex = ['1', '2', '3'];

    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });
};

export const scccComparisonRowTests = () => {
  describe(('Test add comparison rows'), () => {
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

    for (let i = 0; i <= 4; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[0]}-expandmore-icon']`) // weeds
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 2; i <= 7; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[1]}-expandmore-icon']`)
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 8; i <= 16; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[2]}-expandmore-icon']`)
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 18; i <= 20; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[4]}-expandmore-icon']`)
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 21; i <= 28; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[5]}-expandmore-icon']`)
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }
  });
};

export const checkForFiltersSCCC = () => presenceOfFiltersTests({ sidebarFilters });
