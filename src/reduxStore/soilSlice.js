const initialState = {
  soilData: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    pondingFrequency: '',
    latLong: [],
  },
  soilDataOriginal: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    pondingFrequency: '',
    latLong: [],
  },
  isSoilDataLoading: false,
};

/* eslint-disable */
export const updateSoilData = ({
  mapUnitName, drainageClass, floodingFrequency, pondingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA',
  payload: {
    mapUnitName: mapUnitName,
    drainageClass: drainageClass,
    floodingFrequency: floodingFrequency,
    pondingFrequency: pondingFrequency,
    latLong,
  },
});

export const updateSoilDataOriginal = ({
  mapUnitName, drainageClass, floodingFrequency, pondingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA_ORIGINAL',
  payload: {
    mapUnitName: mapUnitName,
    drainageClass: drainageClass,
    floodingFrequency: floodingFrequency,
    pondingFrequency: pondingFrequency,
    latLong,
  },
});
/* eslint-enable */

export const toggleSoilLoader = (value) => ({
  type: 'TOGGLE_SOIL_LOADER',
  payload: {
    value,
  },
});

export const updateDrainageClass = (value) => ({
  type: 'UPDATE_DRAINAGE_CLASS',
  payload: {
    value,
  },
});

export const updateFloodingFrequency = (value) => ({
  type: 'UPDATE_FLOODING_FREQUENCY',
  payload: {
    value,
  },
});

const soilReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_SOIL_DATA':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          mapUnitName: action.payload.mapUnitName,
          drainageClass: action.payload.drainageClass,
          floodingFrequency: action.payload.floodingFrequency,
          pondingFrequency: action.payload.pondingFrequency,
          for: action.payload.latLong,
        },
      };

    // why are there two similar reducers?
    case 'UPDATE_SOIL_DATA_ORIGINAL':
      return {
        ...state,
        soilDataOriginal: {
          ...state.soilDataOriginal,
          mapUnitName: action.payload.mapUnitName,
          drainageClass: action.payload.drainageClass,
          floodingFrequency: action.payload.floodingFrequency,
          pondingFrequency: action.payload.pondingFrequency,
          for: action.payload.latLong,
        },
      };

    case 'TOGGLE_SOIL_LOADER':
      return {
        ...state,
        isSoilDataLoading: action.payload.value, // unused
      };

    case 'UPDATE_DRAINAGE_CLASS':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          drainageClass: action.payload.value,
        },
      };

    case 'UPDATE_FLOODING_FREQUENCY':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          floodingFrequency: action.payload.value,
        },
      };

    default:
      return { ...state };
  }
};

export default soilReducer;
