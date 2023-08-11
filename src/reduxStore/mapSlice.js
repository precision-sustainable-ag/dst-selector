const initialState = {
  regions: [],
  regionId: null,
  regionLabel: null,
  regionShorthand: null,
  stateId: null,
  stateLabel: null,
  councilShorthand: null,
  councilLabel: null,
  selectedRegion: {},
  council: '',
};

export const updateRegions = (value) => ({
  type: 'UPDATE_REGIONS',
  payload: {
    value,
  },
});

export const updateRegion = ({ regionId, regionLabel, regionShorthand }) => ({
  type: 'UPDATE_REGION',
  payload: {
    regionId,
    regionLabel, // unused
    regionShorthand, // unused
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

const mapReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_REGIONS':
      return {
        ...state,
        regions: [...action.payload.value],
      };

    case 'UPDATE_REGION':
      return {
        ...state,
        regionId: action.payload.regionId,
        regionLabel: action.payload.regionLabel,
        regionShorthand: action.payload.regionShorthand,
      };

    case 'UPDATE_STATE_INFO':
      return {
        ...state,
        stateLabel: action.payload.stateLabel,
        councilLabel: action.payload.councilLabel,
        councilShorthand: action.payload.councilShorthand,
        stateId: action.payload.stateId,
      };

    default:
      return { ...state };
  }
};

export default mapReducer;
