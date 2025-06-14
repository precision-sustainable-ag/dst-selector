const initialState = {
  weatherData: {
    averageFrost: {
      firstFrostDate: {
        month: null,
        day: null,
      },
      lastFrostDate: {
        month: null,
        day: null,
      },
    },
    averagePrecipitation: {
      thisMonth: null, // inches
      annual: null, // inches
    },
    frostFreeDays: null,
  },
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

export const setWeatherRedux = (weatherData) => ({
  type: 'SET_WEATHER_REDUX',
  payload: { weatherData },
});

export const setWeatherReduxForTest = (weatherData) => ({
  type: 'SET_WEATHER_REDUX_TEST',
  payload: { weatherData },
});

const weatherReducer = (state = initialState, action = null) => {
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
            ...state.weatherData?.averagePrecipitation,
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
            ...state.weatherData?.averagePrecipitation,
            annual: action.payload.value,
          },
        },
      };

    case 'SET_WEATHER_REDUX':
      return { ...state, ...action.payload.weatherData };

    case 'SET_WEATHER_REDUX_TEST':
      return {
        ...state,
        weatherData: { ...action.payload.weatherData },
      };

    default:
      return { ...state };
  }
};

export default weatherReducer;
