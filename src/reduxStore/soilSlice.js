const initialState = {
  soilData: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    latLong: [],
    tileDrainage: false,
    prevDrainageClass: [],
  },
  soilDataOriginal: {
    mapUnitName: '',
    drainageClass: [],
    floodingFrequency: [],
    latLong: [],
    tileDrainage: false,
    prevDrainageClass: [],
  },
};

/* eslint-disable */
export const updateSoilData = ({
  mapUnitName, drainageClass, floodingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA',
  payload: {
    mapUnitName: mapUnitName,
    drainageClass: drainageClass,
    floodingFrequency: floodingFrequency,
    latLong,
  },
});

export const updateSoilDataOriginal = ({
  mapUnitName, drainageClass, floodingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA_ORIGINAL',
  payload: {
    mapUnitName: mapUnitName,
    drainageClass: drainageClass,
    floodingFrequency: floodingFrequency,
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

export const setSoilRedux = (soilData) => ({
  type: 'SET_SOIL_REDUX',
  payload: { soilData },
});

export const setTileDrainage = (tileDrainage) => ({
  type: 'SET_TILE_DRAINAGE',
  payload: { tileDrainage },
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
          for: action.payload.latLong,
        },
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

    case 'SET_SOIL_REDUX':
      return { ...state, ...action.payload.soilData };

    case 'SET_TILE_DRAINAGE':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          tileDrainage: action.payload.tileDrainage,
          prevDrainageClass: action.payload.tileDrainage ? state.soilData.drainageClass : [],
        },
      };

    default:
      return { ...state };
  }
};

export default soilReducer;
