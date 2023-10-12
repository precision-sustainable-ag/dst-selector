const initialState = {
  activeCropData: [],
  cropData: [],
  selectedCrops: [],
  cashCropData: {
    name: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  },
  activeGrowthPeriod: [],
};

// additional related functions

// actions
export const updateActiveCropData = (value) => ({
  type: 'UPDATE_ACTIVE_CROP_DATA',
  payload: {
    value,
  },
});

export const pullCropData = (value) => ({
  type: 'PULL_CROP_DATA',
  payload: {
    value,
  },
});

export const selectedCropsModifier = (value) => ({
  type: 'SELECTED_CROPS_MODIFIER',
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

// reducer
const cropDataReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_CROP_DATA':
      return {
        ...state,
        activeCropData: action.payload.value,
      };

    case 'PULL_CROP_DATA':
      return {
        ...state,
        cropData: [...action.payload.value],
      };

    case 'SELECTED_CROPS_MODIFIER':
      return {
        ...state,
        selectedCrops: [...action.payload.value],
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

    default:
      return { ...state };
  }
};

export default cropDataReducer;
