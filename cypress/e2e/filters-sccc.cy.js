/* eslint-disable */
import { flipCoverCropName } from '../../src/shared/constants';
import { testFiltersByType } from '../support/e2e';

/* eslint-disable no-undef */

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
    cy.intercept('GET', '**/v1/states/37/crops?minimal=true&*').as('getCropsData');
    cy.intercept('GET', '**/v1/states/37/filters?*').as('getFilters');
    cy.get("[data-test='next-btn']").first().click().then(() => {
      cy.wait('@getCropsData').then((interception) => {
        const { data } = interception.response.body;
        Cypress.env('cropData', data);
      });
      cy.wait('@getFilters').then((interception) => {
        const { data } = interception.response.body;
        // 'Goals' are for goals not filters, remove the data from it
        const filterTypes = data.map((filter) => filter.label).filter((label) => label !== 'Goals');
        const allFilters = data.reduce((res, filter) => {
          if (filter.label === 'Goals') return res;
          return [...res, ...filter.attributes];
        }, []);
        Cypress.env('filterTypes', filterTypes);
        Cypress.env('allFilters', allFilters);
      });
    });
  });

  // FIXME: need further data verification for the filter tests
  // it('should work on all types of filters', () => {
  //   testFiltersByType();
  // });

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

  it('should display selected crops number on My Crops tab and show corresponding crops in My Crops', () => {
    const btnIdx = [0, 1, 2];
    const cropLabels = [];
    const myCropLabels = [];

    btnIdx.forEach((idx) => {
      cy.getByTestId(`cart-btn-${idx}`).click({ force: true });
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
        cy.getByTestId('crop-comparison-table-header').each(($label) => {
          // Ensure the label is visible
          cy.wrap($label).should('be.visible')
            .invoke('text')
            .then((labelText) => {
              myCropLabels.push(flipCoverCropName(labelText));
              cy.log(`Crop Card Label: ${labelText}`);
            });
        })
          .then(() => {
            cy.log('=== CARD LABELS===', myCropLabels);
            expect(cropLabels.length).to.equal(myCropLabels.length);
            btnIdx.forEach((idx) => {
              expect(cropLabels[idx].trim().toLowerCase()).to.equal(myCropLabels[idx].trim().toLowerCase());
            });
          });
      });
  });

  describe('tests for My Selected Crops filters', () => {
    beforeEach(() => {
      // select top 3 crops and go to My Select Crops page, open all accordions
      const btnIdx = [0, 1, 2];
      btnIdx.forEach((idx) => {
        cy.getByTestId(`cart-btn-${idx}`).click();
      });
      cy.get("[data-test='my selected crops-btn']")
        .first()
        .click({ force: true })

      const filterTypes = Cypress.env('filterTypes');
      for (let i = 0; i < filterTypes.length; i++) {
        // FIXME: need verification for this
        if (filterTypes[i] === 'Soil Conditions') continue;
        cy.assertByTestId(`"${filterTypes[i].toUpperCase()}"`);
        cy.getByTestId(`${filterTypes[i].toUpperCase()}-expandmore-icon`).click();
      }
    });

    it('should show all filters and comparisons', () => {
      const allFilters = Cypress.env('allFilters');
      const allFilterName = allFilters.map((filter) => filter.label);
      cy.log(allFilterName);

      for (let i = 0; i < allFilterName.length; i++) {
        // FIXME: need verification for this
        if (allFilterName[i] === 'Soil Moisture Use' 
          || allFilterName[i] === 'Success under Low Nutrient Levels' 
          || allFilterName[i] === 'Supports Mycorrhizae') continue;

        cy.get(`[data-test='${allFilterName[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.assertByTestId(`"${allFilterName[i]}-row"`);
          });

        cy.get(`[data-test='${allFilterName[i]}-checkbox']`)
          .click()
          .then(() => {
            cy.get(`[data-test="${allFilterName[i]}-row"]`).should('not.exist');
          });
      }
    });

    it('should be able to use Show All and Clear Variables button to control comparisons', () => {
      const allFilters = Cypress.env('allFilters');
      const allFilterName = allFilters.map((filter) => filter.label);

      cy.getByTestId('my-selected-crops-show-all').click();
      allFilterName.forEach((filter) => {
        // FIXME: need verification for this
        if (filter === 'Soil Moisture Use' 
          || filter === 'Success under Low Nutrient Levels' 
          || filter === 'Supports Mycorrhizae') return;
        cy.assertByTestId(`"${filter}-row"`);
      });
      cy.getByTestId('my-selected-crops-clear-variables').click();
      allFilterName.forEach((filter) => {
        // FIXME: need verification for this
        if (filter === 'Soil Moisture Use' 
          || filter === 'Success under Low Nutrient Levels' 
          || filter === 'Supports Mycorrhizae') return;
        cy.getByTestId(`${filter}-rows`).should('not.exist');
      });
    });
  });
});
