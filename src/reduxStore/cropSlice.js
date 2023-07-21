// initial state

const initialState = {
    activeCropData: [],
    cropData: [],
    selectedCrops: [],
    cashCropData: {
      name: '',
      dataRange: {
        startDate: '',
        endDate: '',
      },
    },
    activeGrowthPeriod: [],
    };
  
  
  // additional related functions
  
  
  // actions
    export const updateActiveCropData = (value) => {
      return {
        type: 'UPDATE_ACTIVE_CROP_DATA',
        payload: {
          value,
        },
      };
    };
  
    export const pullCropData = (value) => {
      return {
        type: 'PULL_CROP_DATA',
        payload: {
          value,
        },
      };
    };
  
    export const selectedCropsModifier = (value) => {
      return {
        type: 'SELECTED_CROPS_MODIFIER',
        payload: {
          value,
        },
      };
    };
  
    export const updateDateRange = (startDate, endDate) => {
      return {
        type: 'UPDATE_DATE_RANGE',
        payload: {
          startDate: startDate,
          endDate: endDate,
        },
      };
    };
  
  // reducer
    const cropDataReducer = (state = initialState, action) => {
      switch (action.type) {
        case 'UPDATE_ACTIVE_CROP_DATA':
          return {
            ...state,
            activeCropData: action.payload.value,
            // changedFilters: false can have different slice
          };
  
        case 'PULL_CROP_DATA':
          return {
            ...state,
            cropData: action.payload.value,
            activeCropData: action.payload.value,
          };
  
        case 'SELECTED_CROPS_MODIFIER':
          return {
            ...state,
            selectedCrops: action.payload.value,
            // snackOpen: action.data.snackOpen,
            // snackMessage: action.data.snackMessage,
          };
        
        case 'UPDATE_DATE_RANGE':
          return {
            ...state,
            cashCropData:{
              ...state.cashCropData,
              dataRange: {
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
              },
            },
          };
  
        default:
            return {...state};
      }
    }
  
    export default cropDataReducer; 