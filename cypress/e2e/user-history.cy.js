/* eslint-disable no-undef */

describe('Test create and import user history records', () => {
  beforeEach(() => {
    cy.intercept({ url: 'https://api.mapbox.com/**' }, { log: false });
    cy.intercept({ url: 'https://events.mapbox.com/**' }, { log: false });

    cy.intercept('POST', 'https://develophistory.covercrop-data.org/v1/history', {
      statusCode: 200, body: { data: { id: 0 } },
    }).as('createHistory');
    cy.intercept('https://develophistory.covercrop-data.org/v1/histories?schema=*').as('getHistory');
    cy.intercept('PUT', 'https://develophistory.covercrop-data.org/v1/history/*', {
      statusCode: 200,
      body: {},
    }).as('updateHistory');

    cy.loginToAuth0();
    cy.visit('/');
  });

  it('should show history related buttons after log in', () => {
    cy.assertByTestId('create-new-history');
    cy.assertByTestId('import-previous-history');
  });

  it('should be able to create a history', () => {
    // create a new history
    cy.getByTestId('create-new-history').click();
    cy.getByTestId('input-field-name').find('input').type('cypress-test');
    cy.getByTestId('history-dialog-create').click();
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('new');
    });
    // select state
    cy.getByTestId('state-selector-dropdown').first().click();
    cy.get("[data-test='state-selector-dropdown-NEW YORK']").click();
    cy.getByTestId('next-btn').first().click();
    // history state should be new and the api call should not been made at this time
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('new');
    });

    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_LOCATION',
      payload: { address: '170 State Street', markers: [[42.652843, -73.757874]], county: 'Albany County' },
    });
    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_REGION',
      payload: { regionId: 3, regionShorthand: '6' },
    });

    cy.getByTestId('next-btn').first().click();
    // api call when reach Site Condition page
    cy.wait('@createHistory').its('response.statusCode').should('equal', 200);
    cy.wait(1000);
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('imported');
    });
  });

  it('should be able to import a history', () => {
    cy.getByTestId('import-previous-history').click();
    cy.getByTestId('select-history').click();
    cy.getByTestId('select-history-test1').click();
    cy.getByTestId('import-history').click();
    cy.wait('@getHistory').wait(1000);
    // history state should be imported
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('imported');
    });
  });
});

describe('Test for updating user history', () => {
  beforeEach(() => {
    cy.intercept({ url: 'https://api.mapbox.com/**' }, { log: false });
    cy.intercept({ url: 'https://events.mapbox.com/**' }, { log: false });
    cy.intercept('https://develophistory.covercrop-data.org/v1/histories?schema=*').as('getHistory');
    cy.intercept('PUT', 'https://develophistory.covercrop-data.org/v1/history/*', {
      statusCode: 200,
      body: {},
    }).as('updateHistory');

    cy.loginToAuth0();
    cy.visit('/');
    cy.getByTestId('import-previous-history').click();
    cy.getByTestId('select-history').click();
    cy.getByTestId('select-history-test1').click();
    cy.getByTestId('import-history').click();
    cy.wait('@getHistory').wait(1000);

    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('imported');
    });
  });

  it('should not be able to update history on Landing and Location page', () => {
    cy.getByTestId('state-selector-dropdown').first().click();
    cy.getByTestId('state-selector-dropdown-INDIANA').click();
    cy.assertByTestId('history-dialog-warning');
  });

  it('should be able to update history after Location page', () => {
    cy.getByTestId('next-btn').first().click();

    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_LOCATION',
      payload: { address: '170 State Street', markers: [[42.652843, -73.757874]], county: 'Albany County' },
    });
    cy.window().its('store').invoke('dispatch', {
      type: 'UPDATE_REGION',
      payload: { regionId: 3, regionShorthand: '6' },
    });

    cy.getByTestId('next-btn').first().click();
    cy.assertByTestId('drainage-class-chip-box');
    cy.getByTestId('drainage-class-chip-0').click();
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('updated');
    });
    cy.getByTestId('next-btn').first().click();
    cy.wait('@updateHistory').wait(1000);
    cy.getReduxState().then((state) => {
      const { historyState } = state.userData;
      cy.log(historyState);
      expect(historyState).to.equal('imported');
    });
  });
});
