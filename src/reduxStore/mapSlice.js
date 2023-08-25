const initialState = {
  regions: [],
  regionId: null,
  regionLabel: null,
  stateId: null,
  stateLabel: null,
  councilShorthand: null,
  councilLabel: null,
};

export const updateRegions = (value) => ({
  type: 'UPDATE_REGIONS',
  payload: {
    value,
  },
});

export const updateRegion = ({ regionId }) => ({
  type: 'UPDATE_REGION',
  payload: {
    regionId,
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
