import { sidebarFilters, filterResult, filterTypes } from '../../src/test-data/neccc';
import { checkComparisonTableRows, presenceOfFiltersTests } from './e2e';

/* eslint-disable no-undef */

export const necccFilterTests = () => {
  // weeds
  it('should filter correct crops on Persistence filter options', () => {
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType: filterTypes[0],
      filterIndex,
      filterResult: filterResult[filterTypes[0]],
    });
  });

  it('should filter correct crops on Volunteer Establishment filter options', () => {
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType: filterTypes[1],
      filterIndex,
      filterResult: filterResult[filterTypes[1]],
    });
  });

  //  environmental tolerances
  it('should filter correct crops on Drought filter options', () => {
    const filterType = filterTypes[2];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Flood filter options', () => {
    const filterType = filterTypes[3];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Heat filter options', () => {
    const filterType = filterTypes[4];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Low Fertility filter options', () => {
    const filterType = filterTypes[5];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Salinity filter options', () => {
    const filterType = filterTypes[6];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Shade filter options', () => {
    const filterType = filterTypes[7];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // growth traits
  it('should filter correct crops on Active Growth Period filter options', () => {
    const filterType = filterTypes[8];
    const filterIndex = ['Fall', 'Spring', 'Summer', 'Winter'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Duration filter options', () => {
    const filterType = filterTypes[9];
    const filterIndex = ['Annual', 'Biennial', 'Perennial', 'Short-lived Perennial'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Early Spring Growth filter options', () => {
    const filterType = filterTypes[10];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Ease of Establishment filter options', () => {
    const filterType = filterTypes[11];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Establishes Quickly filter options', () => {
    const filterType = filterTypes[12];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Growing Window filter options', () => {
    const filterType = filterTypes[13];
    const filterIndex = ['1', '2', '3', '4', '5'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Root Architecture filter options', () => {
    const filterType = filterTypes[14];
    const filterIndex = ['Fibrous', 'Tap'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Root Depth filter options', () => {
    const filterType = filterTypes[15];
    const filterIndex = ['Deep', 'Shallow', 'Medium'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Winter Survival filter options', () => {
    const filterType = filterTypes[16];
    const filterIndex = ['Expected', 'Never', 'Seldom'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // soil conditions

  it('should filter correct crops on Supports Mycorrhizae filter options', () => {
    const filterType = filterTypes[17];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // planting

  // it.only('should filter correct crops on Frost Seed filter options', () => {
  //     const sidebarFilter = sidebarFilters[4];
  //     const filterType = filterTypes[18];
  //     const filterIndex = [1,2,3,4,5];
  //     cy.assertByTestId(`"${sidebarFilter.toUpperCase()}-expandmore-icon"`).click();
  //     checkRows(filterType, filterIndex);
  // });

  it('should filter correct crops on Seed Price Per lb filter options', () => {
    const filterType = filterTypes[19];
    const filterIndex = ['1', '2', '3'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  // it.only('should filter correct crops on Aerial Seed filter options', () => {
  //     const sidebarFilter = sidebarFilters[4];
  //     const filterType = filterTypes[20];
  //     const filterIndex = [1,2,3,4,5];
  //     cy.assertByTestId(`"${sidebarFilter.toUpperCase()}-expandmore-icon"`).click();
  //     checkRows(filterType, filterIndex);
  // });

  // termination

  it('should filter correct crops on Chemical at Flowering filter options', () => {
    const filterType = filterTypes[21];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Chemical at Vegetative filter options', () => {
    const filterType = filterTypes[22];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Freezing at Flowering filter options', () => {
    const filterType = filterTypes[23];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Freezing at Vegetative filter options', () => {
    const filterType = filterTypes[24];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Mow at Flowering filter options', () => {
    const filterType = filterTypes[25];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Roller-Crimp at Flowering filter options', () => {
    const filterType = filterTypes[26];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Tillage at Flowering filter options', () => {
    const filterType = filterTypes[27];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Tillage at Vegetative filter options', () => {
    const filterType = filterTypes[28];
    const filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[5],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });
};

export const necccComparisonRowTests = () => {
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

    for (let i = 0; i <= 1; i++) {
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

export const checkForFiltersNECCC = () => presenceOfFiltersTests({ sidebarFilters });
