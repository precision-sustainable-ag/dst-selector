/* eslint-disable */
// import { necccFilterTests } from '../support/e2e-neccc';
import { flipCoverCropName } from '../../src/shared/constants';
import { testFiltersByType } from '../support/e2e';

/* eslint-disable no-undef */

const filterDataTypes = ['pillbox', 'string', 'boolean', 'currency'];

describe('Test all possible interactions on the SCCC Crop Calendar Page', () => {
  // before each test
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept({ url: 'https://api.mapbox.com/**' }, { log: false });
    cy.intercept({ url: 'https://events.mapbox.com/**' }, { log: false });
    cy.beforeEachVisitBaseUrl();
    cy.assertByTestId('state-selector-dropdown').first().click();
    cy.get("[data-test='state-selector-dropdown-NORTH CAROLINA']").click();
    cy.getByTestId('state-selector-dropdown').first().find('input').should('have.value', 'NC');
    cy.assertByTestId('next-btn').first().click();
    cy.assertByTestId('field-location-title');

    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_LOCATION',
      payload: { address: '1 East Edenton Street', markers: [[35.78043, -78.639099]], county: 'Wake County' },
    });
    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_REGION',
      payload: { regionId: 60, regionShorthand: '8' },
    });

    cy.get("[data-test='next-btn']").first().click();
    cy.assertByTestId('site-conditions-title');
    cy.get("[data-test='next-btn']").first().click();
    cy.assertByTestId('title-goals');
    cy.intercept('GET', '**/v1/states/37/crops?minimal=true&regions=60').as('getCropsData');
    cy.intercept('GET', '**/v1/states/37/filters?regions=60').as('getFilters');
    cy.get("[data-test='next-btn']").first().click().then(() => {
      cy.wait('@getCropsData').then((interception) => {
        const { data } = interception.response.body;
        Cypress.env('cropData', data);
      });
      cy.wait('@getFilters').then((interception) => {
        const { data } = interception.response.body;
        Cypress.env('filters', data);
      });
    });
  });

  // necccFilterTests();
  it.only('should work on all types of filters', () => {
    const cropData = Cypress.env('cropData');
    const filters = Cypress.env('filters');
    // 'Goals' are for goals not filters, remove the data from it
    const filterTypes = filters.map((filter) => filter.label).filter((label) => label !== 'Goals');

    const allFilters = filters.reduce((res, filter) => {
      if (filter.label === 'Goals') return res;
      return [...res, ...filter.attributes];
    }, []);

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
    testFiltersByType(filterTypes, testFilters, testFilterValues, filterResults);
  });

  it('should display same crop list on crop calendar and crop list', () => {
    const calendarCrops = [];
    cy.getByTestId('crop-calendar-crop-name')
      .each((crop) => {
        cy.wrap(crop.text()).then((text) => calendarCrops.push(text));
      })
      .then(() => {
        cy.log(calendarCrops);
      })
      .then(() => {
        cy.get("[data-test='crop-list-btn']").first().click();
        cy.getByTestId('crop-calendar-crop-name')
          .should('have.length', calendarCrops.length)
          .each((crop) => {
            cy.wrap(crop.text()).then((text) => {
              expect(calendarCrops).to.include(text);
            });
          });
      });
  });
});
