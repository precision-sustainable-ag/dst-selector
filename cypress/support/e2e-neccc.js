/* eslint-disable prefer-destructuring */
import { sidebarFilters, filterResult, filterTypes } from '../test-data/neccc';

/* eslint-disable no-undef */

// eslint-disable-next-line import/prefer-default-export
export const necccFilterTests = () => {
  beforeEach(() => {
    for (let i = 0; i < sidebarFilters.length; i++) {
      // eslint-disable-next-line no-continue
      if (sidebarFilters[i] === 'SOIL CONDITIONS') continue;
      cy.assertByTestId(`"${sidebarFilters[i]}-expandmore-icon"`).click();
    }
  });

  it('should work for all types of filters', () => {
    let filterIndex;
    let filterType;
    // weeds
    // 'should filter correct crops on Persistence filter options'
    cy.log('should work for number filter');
    filterIndex = [1, 2, 3, 4, 5];
    cy.testFilters({
      sidebarFilter: sidebarFilters[0],
      filterType: filterTypes[0],
      filterIndex,
      filterResult: filterResult[filterTypes[0]],
    });

    // should filter correct crops on Volunteer Establishment filter options
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[0],
    //   filterType: filterTypes[1],
    //   filterIndex,
    //   filterResult: filterResult[filterTypes[1]],
    // });

    //  environmental tolerances
    // should filter correct crops on Drought filter options
    // filterType = filterTypes[2];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Flood filter options
    // filterType = filterTypes[3];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Heat filter options
    // filterType = filterTypes[4];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Low Fertility filter options
    // filterType = filterTypes[5];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Salinity filter options
    // filterType = filterTypes[6];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Shade filter options
    // filterType = filterTypes[7];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[1],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // growth traits
    // should filter correct crops on Active Growth Period filter options
    cy.log('should work for string filter');
    filterType = filterTypes[8];
    filterIndex = ['Fall', 'Spring', 'Summer', 'Winter'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });

    // should filter correct crops on Duration filter options
    // filterType = filterTypes[9];
    // filterIndex = ['Annual', 'Biennial', 'Perennial', 'Short-lived Perennial'];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Early Spring Growth filter options
    // filterType = filterTypes[10];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Ease of Establishment filter options
    // filterType = filterTypes[11];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Establishes Quickly filter options
    // filterType = filterTypes[12];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Growing Window filter options
    cy.log('should work for string filter');
    filterType = filterTypes[13];
    filterIndex = ['1', '2', '3', '4', '5'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[2],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });

    // should filter correct crops on Root Architecture filter options
    // filterType = filterTypes[14];
    // filterIndex = ['Fibrous', 'Tap'];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Root Depth filter options
    // filterType = filterTypes[15];
    // filterIndex = ['Deep', 'Shallow', 'Medium'];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Winter Survival filter options
    // filterType = filterTypes[16];
    // filterIndex = ['Expected', 'Never', 'Seldom'];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[2],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // soil conditions

    // should filter correct crops on Supports Mycorrhizae filter options
    // filterType = filterTypes[17];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[3],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // planting

    // it.only('should filter correct crops on Frost Seed filter options
    cy.log('should work for binary filter');
    filterType = filterTypes[18];
    filterIndex = ['Yes', 'No'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });
    // });

    // should filter correct crops on Seed Price Per lb filter options
    cy.log('should work for dollar filter');
    filterType = filterTypes[19];
    filterIndex = ['1', '2', '3'];
    cy.testFilters({
      sidebarFilter: sidebarFilters[4],
      filterType,
      filterIndex,
      filterResult: filterResult[filterType],
    });

    // it.only('should filter correct crops on Aerial Seed filter options
    //     const sidebarFilter = sidebarFilters[4];
    //     filterType = filterTypes[20];
    //     filterIndex = [1,2,3,4,5];
    //     cy.assertByTestId(`"${sidebarFilter.toUpperCase()}-expandmore-icon"`).click();
    //     checkRows(filterType, filterIndex);
    // });

    // termination

    // should filter correct crops on Chemical at Flowering filter options
    // filterType = filterTypes[21];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Chemical at Vegetative filter options
    // filterType = filterTypes[22];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Freezing at Flowering filter options
    // filterType = filterTypes[23];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Freezing at Vegetative filter options
    // filterType = filterTypes[24];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Mow at Flowering filter options
    // filterType = filterTypes[25];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Roller-Crimp at Flowering filter options
    // filterType = filterTypes[26];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Tillage at Flowering filter options
    // filterType = filterTypes[27];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });

    // should filter correct crops on Tillage at Vegetative filter options
    // filterType = filterTypes[28];
    // filterIndex = [1, 2, 3, 4, 5];
    // cy.testFilters({
    //   sidebarFilter: sidebarFilters[5],
    //   filterType,
    //   filterIndex,
    //   filterResult: filterResult[filterType],
    // });
  });
};
