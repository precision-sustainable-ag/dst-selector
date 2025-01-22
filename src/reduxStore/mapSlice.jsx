const initialState = {
  regions: [],
  regionId: null,
  regionShorthand: null,
  stateId: null,
  stateLabel: null,
  councilShorthand: null,
  councilLabel: null,
  lat: 47,
  lon: -122,
};

export const updateRegions = (value) => ({
  type: 'UPDATE_REGIONS',
  payload: {
    value,
  },
});

export const updateRegion = ({ regionId, regionShorthand }) => ({
  type: 'UPDATE_REGION',
  payload: {
    regionId,
    regionShorthand,
  },
});

export const updateStateInfo = ({
  stateLabel, stateId, councilShorthand, councilLabel,
}) => ({
  type: 'UPDATE_STATE_INFO',
  payload: {
    stateLabel,
    stateId,
    councilShorthand,
    councilLabel,
  },
});

export const updateLatLon = ({ lat, lon }) => ({
  type: 'UPDATE_LAT_LON',
  payload: {
    lat,
    lon,
  },
});

export const setMapRedux = (mapData) => ({
  type: 'SET_MAP_REDUX',
  payload: { mapData },
});

const mapReducer = (state = initialState, action = null) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_REGIONS':
      return {
        ...state,
        regions: [...payload.value],
      };

    case 'UPDATE_REGION':
      return {
        ...state,
        regionId: payload.regionId,
        regionShorthand: payload.regionShorthand,
      };

    case 'UPDATE_STATE_INFO':
      return {
        ...state,
        stateLabel: payload.stateLabel,
        councilLabel: payload.councilLabel,
        councilShorthand: payload.councilShorthand,
        stateId: payload.stateId,
      };

    case 'UPDATE_LAT_LON':
      return {
        ...state,
        lat: payload.lat,
        lon: payload.lon,
      };

    case 'SET_MAP_REDUX':
      return { ...state, ...payload.mapData };

    default:
      return { ...state };
  }
};

export default mapReducer;
