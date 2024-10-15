import React from 'react';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';
import WeatherFrostDates from './WeatherFrostDates';
import configureStore from '../../../reduxStore/store';
import { setWeatherReduxForTest } from '../../../reduxStore/weatherSlice';

/* eslint-disable no-undef */

describe('<WeatherFrostDates />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({});
  });

  const mountComponentWithProvider = () => {
    mount(
      <Provider store={reduxStore}>
        <WeatherFrostDates />
      </Provider>,
    );
  };

  it('should render the Weather Frost Dates Card', () => {
    mountComponentWithProvider();
    cy.assertByTestId('frost-dates-card');
  });

  it('should render dates present in the weather data redux store', () => {
    const weatherData = {
      averageFrost: {
        firstFrostDate: {
          month: 'September',
          day: '26',
        },
        lastFrostDate: {
          month: 'June',
          day: '17',
        },
      },
      averagePrecipitation: {
        thisMonth: '40.27',
        annual: '400.71',
      },
      frostFreeDays: 367,
    };
    reduxStore.dispatch(setWeatherReduxForTest(weatherData));
    mountComponentWithProvider();

    // Assert that the first frost date is displayed correctly
    cy.assertByTestId('frost-dates-card')
      .should(
        'contain.text',
        `${weatherData.averageFrost.firstFrostDate.month} ${weatherData.averageFrost.firstFrostDate.day}`,
      );

    // Assert that the last frost date is displayed correctly
    cy.assertByTestId('frost-dates-card')
      .should('contain.text', `${weatherData.averageFrost.lastFrostDate.month} ${weatherData.averageFrost.lastFrostDate.day}`);

    // Assert that the frost free days are displayed correctly
    cy.assertByTestId('frost-dates-card').should('contain.text', weatherData.frostFreeDays.toString());
  });
});
