import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'cypress/react18';
import WeatherPrecipitation from './WeatherPrecipitation';
import configureStore from '../../../reduxStore/store';
import { setWeatherReduxForTest } from '../../../reduxStore/weatherSlice';

/* eslint-disable no-undef */

describe('<WeatherPrecipitation />', () => {
  let reduxStore;
  beforeEach(() => {
    reduxStore = configureStore({});
  });

  const mountComponentWithProp = (props) => {
    mount(
      <Provider store={reduxStore}>
        <WeatherPrecipitation {...props} />
      </Provider>,
    );
  };

  it('should render the Weather Precipitation Card', () => {
    const currentMonthFull = 'September';
    const props = { currentMonthFull };
    mountComponentWithProp(props);
    cy.assertByTestId('precipitation-card');
  });

  it('should render month present in the parameter', () => {
    const currentMonthFull = 'June';
    const props = { currentMonthFull };
    mountComponentWithProp(props);
    cy.assertByTestId('precipitation-card').should('contain.text', currentMonthFull);
  });

  it('should render correct value for average precipitation and annual precipitation according to Redux store values', () => {
    const currentMonthFull = 'June';
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

    const props = { currentMonthFull };
    mountComponentWithProp(props);
    cy.assertByTestId('precipitation-card').should('contain.text', weatherData.averagePrecipitation.thisMonth);
    cy.assertByTestId('precipitation-card').should('contain.text', weatherData.averagePrecipitation.annual);
  });
});
