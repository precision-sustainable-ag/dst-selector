import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import GoalsSelector from './GoalsSelector';
import configureStore from '../../reduxStore/store';
import { updateRegion, updateStateInfo } from '../../reduxStore/mapSlice';
import { updateAllGoals } from '../../reduxStore/goalSlice';

/* eslint-disable no-undef */

describe('<GoalsSelector />', () => {
  let reduxStore;
  const goalsData = [
    {
      label: 'Forage Harvest Value',
      description: '',
      tags: [],
    },
    {
      label: 'Good Grazing',
      description: '',
      tags: [],
    },
    {
      label: 'Growing Window',
      description: '',
      tags: [],
    },

  ];
  beforeEach(() => {
    reduxStore = configureStore({});
    reduxStore.dispatch(updateStateInfo(
      {
        stateLabel: 'New York',
        stateId: 36,
        councilShorthand: 'NECCC',
        councilLabel: 'Northeast Cover Crops Council',
      },
    ));
    reduxStore.dispatch(updateRegion(
      {
        regionId: 3,
        regionShorthand: '6',
      },
    ));
    reduxStore.dispatch(updateAllGoals(goalsData));

    mount(
      <Provider store={reduxStore}>
        <GoalsSelector />
      </Provider>,
    );
  });

  // goals card

  it(
    'should contain goals subtitle',
    () => {
      cy.contains(/select up to 3 goals in order of importance/i);
    },
  );

  it(
    'should contain info text',
    () => {
      cy.contains(/tap and hold for more information/i);
    },
  );

  it('should render the Goals Selector component', () => {
    cy.assertByTestId('goals-card');
    cy.assertByTestId('cashcrop-window');
  });

  it(
    'should render correct number of goals and should have correct goal labels',
    () => {
      goalsData.forEach((goal, index) => {
        const testId = `goal-tag-${index}`;
        cy.assertByTestId(testId)
          .should('have.text', goal.label);
      });
    },
  );

  // cash crop growth window

  it(
    'should contain cashcrop window subtitle',
    () => {
      cy.contains(/enter your cash crop growing window if you would like to see it displayed on the calendar./i);
    },
  );

  // TODO: see how we can add data-test to date pickers
});
