// import { useEffect } from "react";

const initialState = {
  soilData: {
    Map_Unit_Name: '',
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: '',
  },
  soilDataOriginal: {
    Map_Unit_Name: '',
    Drainage_Class: [],
    Flooding_Frequency: [],
    Ponding_Frequency: '',
  },
  isSoilDataLoading: false,
};

/* eslint-disable */
// TODO make camel case
export const updateSoilData = ({
  Map_Unit_Name, Drainage_Class, Flooding_Frequency, PondingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA',
  payload: {
    mapUnitName: Map_Unit_Name,
    drainageClass: Drainage_Class,
    floodingFrequency: Flooding_Frequency,
    pondingFrequency: PondingFrequency,
    latLong,
  },
});

export const updateSoilDataOriginal = ({
  Map_Unit_Name, Drainage_Class, Flooding_Frequency, PondingFrequency, latLong,
}) => ({
  type: 'UPDATE_SOIL_DATA_ORIGINAL',
  payload: {
    mapUnitName: Map_Unit_Name,
    drainageClass: Drainage_Class,
    floodingFrequency: Flooding_Frequency,
    pondingFrequency: PondingFrequency,
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

export const updatedDrainageClass = (value) => ({
  type: 'UPDATE_DRAINAGE_CLASS',
  payload: {
    value,
  },
});

export const updatedFloodingFrequency = (value) => ({
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
          Map_Unit_Name: action.payload.mapUnitName,
          Drainage_Class: action.payload.drainageClass,
          Flooding_Frequency: action.payload.floodingFrequency,
          Ponding_Frequency: action.payload.pondingFrequency,
          for: action.payload.latLong,
        },
      };

    // why are there two similar reducers?
    case 'UPDATE_SOIL_DATA_ORIGINAL':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Map_Unit_Name: action.payload.mapUnitName,
          Drainage_Class: action.payload.drainageClass,
          Flooding_Frequency: action.payload.floodingFrequency,
          Ponding_Frequency: action.payload.pondingFrequency,
          for: action.payload.latLong,
        },
      };

    case 'TOGGLE_SOIL_LOADER':
      return {
        ...state,
        isSoilDataLoading: action.payload.value,
      };

    case 'UPDATE_DRAINAGE_CLASS':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Drainage_Class: action.payload.value,
        },
      };

    case 'UPDATE_FLOODING_FREQUENCY':
      return {
        ...state,
        soilData: {
          ...state.soilData,
          Flooding_Frequency: action.payload.value,
        },
      };

    default:
      return { ...state };
  }
};

export default soilReducer;
