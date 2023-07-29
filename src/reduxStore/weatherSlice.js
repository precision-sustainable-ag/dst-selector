const initialState = {
  weatherData: {
    averageFrost: {
      firstFrostDate: {
        month: 'October',
        day: 21,
      },
      lastFrostDate: {
        month: 'April',
        day: 20,
      },
    },
    averagePrecipitation: {
      thisMonth: 3.6, // inches
      annual: 43, // inches
    },
    frostFreeDays: 173,
  },
  weatherDataReset: false,
};

export const updateWeatherConditions = (value) => ({
  type: 'UPDATE_WEATHER_CONDITIONS',
  payload: {
    value,
  },
});

export const updateFrostFreeDays = (value) => ({
  type: 'UPDATE_FROST_FREE_DAYS',
  payload: {
    value,
  },
});

export const updateAvgFrostDates = (value) => ({
  type: 'UPDATE_AVERAGE_FROST_DATES',
  payload: {
    value,
  },
});

export const updateAvgPrecipCurrentMonth = (value) => ({
  type: 'UPDATE_AVERAGE_PRECIP_CURRENT_MONTH',
  payload: {
    value,
  },
});

export const updateAvgPrecipAnnual = (value) => ({
  type: 'UPDATE_AVERAGE_PRECIP_ANNUAL',
  payload: {
    value,
  },
});

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WEATHER_CONDITIONS':
      return {
        ...state,
        weatherData: action.payload.value,
      };

    case 'UPDATE_FROST_FREE_DAYS':
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          frostFreeDays: action.payload.value,
        },
      };

    case 'UPDATE_AVERAGE_FROST_DATES':
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averageFrost: action.payload.value,
        },
      };

    case 'UPDATE_AVERAGE_PRECIP_CURRENT_MONTH':
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averagePrecipitation: {
            ...state.weatherData.averagePrecipitation,
            thisMonth: action.payload.value,
          },
        },
      };

    case 'UPDATE_AVERAGE_PRECIP_ANNUAL':
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          averagePrecipitation: {
            ...state.weatherData.averagePrecipitation,
            annual: action.payload.value,
          },
        },
      };

    default:
      return { ...state };
  }
};

export default weatherReducer;
