const initialState = {
  activeCropIds: [],
  cropData: [],
  selectedCropIds: [],
  cashCropData: {
    dateRange: {
      startDate: '',
      endDate: '',
    },
  },
  // FIXME: not used now
  activeGrowthPeriod: [],
};

// additional related functions

// actions
export const updateActiveCropIds = (value) => ({
  type: 'UPDATE_ACTIVE_CROP_IDS',
  payload: {
    value,
  },
});

export const updateCropData = (value) => ({
  type: 'UPDATE_CROP_DATA',
  payload: {
    value,
  },
});

export const updateSelectedCropIds = (value) => ({
  type: 'UPDATE_SELECTED_CROP_IDS',
  payload: {
    value,
  },
});

export const updateDateRange = ({ startDate, endDate }) => ({
  type: 'UPDATE_DATE_RANGE',
  payload: {
    startDate,
    endDate,
  },
});

export const setCropRedux = (cropData) => ({
  type: 'SET_CROP_REDUX',
  payload: { cropData },
});

// reducer
const cropDataReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_CROP_IDS':
      return {
        ...state,
        activeCropIds: action.payload.value,
      };

    case 'UPDATE_CROP_DATA':
      return {
        ...state,
        cropData: [...action.payload.value],
      };

    case 'UPDATE_SELECTED_CROP_IDS':
      return {
        ...state,
        selectedCropIds: [...action.payload.value],
      };

    case 'UPDATE_DATE_RANGE': {
      return {
        ...state,
        cashCropData: {
          ...state.cashCropData,
          dateRange: {
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          },
        },
      };
    }

    case 'SET_CROP_REDUX':
      return { ...state, ...action.payload.cropData };

    default:
      return { ...state };
  }
};

export default cropDataReducer;
