import { sidebarFilters, filterResult, filterTypes } from '../../src/test-data/mwccc';
import { checkComparisonTableRows, presenceOfFiltersTests } from './e2e';

/* eslint-disable no-undef */

export const mwcccFilterTests = () => {
  it('should filter correct crops on Frost Seed options', () => {
    const filterIndex = ['No', 'Yes'];
    const filterType = filterTypes[0];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Fly-free Date options', () => {
    const filterIndex = ['No', 'Yes'];
    const filterType = filterTypes[1];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Termination Methods options', () => {
    const filterIndex = ['Chemical', 'Freeze', 'Mow', 'Roller Crimp', 'Tillage'];
    const filterType = filterTypes[2];
    cy.testFilters({
      sidebarFilter: sidebarFilters[1],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Heat Tolerance options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[3];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Drought Tolerance options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[4];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Shade Tolerance options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Flood Tolerance options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[6];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Low Fertility Tolerance options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[7];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Limited Rainfall options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[8];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Winter Survival options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[9];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Impact - Subsoiler options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[10];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Impact - Frees P and K options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[11];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Impact - Loosens Topsoil options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[12];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Ecology - Nematodes options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[13];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Ecology - Disease options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[14];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Ecology - Allelopathic options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[15];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Soil Ecology - Choke Weeds options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[16];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Other - Attract Beneficials options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[17];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Other - Bears Traffic options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[18];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Other - Short Windows options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[19];
    cy.testFilters({
      sidebarFilter: sidebarFilters[3],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Delayed Emergence options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[20];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Increased Weed Potential options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[21];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Increased Insects/Nematodes options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[22];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Increased Crop Diseases options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[23];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Hinders Crops options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[24];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Establishment Challenges options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[25];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });

  it('should filter correct crops on Mature Incorporation Challenges options', () => {
    const filterIndex = [0, 1, 2, 3, 4];
    const filterType = filterTypes[26];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
  });
};

export const mwcccComparisonRowTests = () => {
  describe('Test add comparison rows', () => {
    beforeEach(() => {
      const btnIdx = [0, 1, 2];
      btnIdx.forEach((idx) => {
        cy.assertByTestId(`cart-btn-${idx}`).click({ force: true });
      });
      cy.get("[data-cy='my selected crops-btn']")
        .first()
        .click({ force: true })
        .then(() => {
          cy.get("[data-cy='comparison-view-btn']")
            .should('be.visible')
            .click();
        });
    });

    // TODO: combine all tests
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

    it(`should display ${filterTypes[2]} row when ${filterTypes[2]} variable is clicked`, () => {
      cy.get(`[data-cy='${sidebarFilters[1]}-expandmore-icon']`) // weeds
        .should('be.visible')
        .click()
        .then(() => {
          checkComparisonTableRows({ filterName: filterTypes[2] });
        });
    });

    for (let i = 3; i <= 9; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[2]}-expandmore-icon']`) // weeds
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 10; i <= 19; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[3]}-expandmore-icon']`) // weeds
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }

    for (let i = 20; i <= 26; i++) {
      it(`should display ${filterTypes[i]} row when ${filterTypes[i]} variable is clicked`, () => {
        cy.get(`[data-cy='${sidebarFilters[4]}-expandmore-icon']`) // weeds
          .should('be.visible')
          .click()
          .then(() => {
            checkComparisonTableRows({ filterName: filterTypes[i] });
          });
      });
    }
  });
};

export const checkForFiltersMWCCC = () => presenceOfFiltersTests({ sidebarFilters });
