const initialState = {
  filters: {
    cropSearch: '',
    additionalSoilDrainageFilter: false,
    soilDrainageFilter: false,
    irrigationFilter: false,
    cropGroupFilter: '',
  },
};

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
});

export const filterToggle = ({ value }) => ({
  type: 'FILTER_TOGGLE',
  payload: {
    value,
  },
});

export const filterOnRedux = (value) => ({
  type: 'FILTER_ON',
  payload: {
    value,
  },
});

export const filterOffRedux = (value) => ({
  type: 'FILTER_OFF',
  payload: {
    value,
  },
});

export const cropSearch = (value) => ({
  type: 'CROP_SEARCH',
  payload: {
    value,
  },
});

export const toggleFilterValue = (value) => ({
  type: 'TOGGLE_FILTER_VALUE',
  payload: {
    value,
  },
});

export const setSoilDrainageFilter = (soilDrainageFilter) => ({
  type: 'SET_DRAINAGE_FILTER',
  payload: { soilDrainageFilter },
});

export const setAdditionalSoilDrainageFilter = (additionalSoilDrainageFilter) => ({
  type: 'SET_ADDITIONAL_DRAINAGE_FILTER',
  payload: { additionalSoilDrainageFilter },
});

export const setIrrigationFilter = (irrigationFilter) => ({
  type: 'SET_IRRIGATION_FILTER',
  payload: { irrigationFilter },
});

export const setCropGroupFilter = (cropGroupFilter) => ({
  type: 'SET_CROP_GROUP_FILTER',
  payload: { cropGroupFilter },
});

const filterReducer = (state = initialState, action = null) => {
  let filters = { ...state.filters };
  const value = action && action.payload && action.payload.value;
  switch (action.type) {
    case 'CLEAR_FILTERS':
      filters = {
        cropSearch: '',
        soilDrainageFilter: false,
        irrigationFilter: false,
        cropGroupFilter: '',
      };

      return {
        ...state,
        filters,
      };

    case 'FILTER_TOGGLE':
      filters[value] = !filters[value];

      return {
        ...state,
        filters,
      };

    case 'FILTER_ON':
      filters[value] = true;

      return {
        ...state,
        filters,
      };

    case 'FILTER_OFF':
      filters[value] = false;

      return {
        ...state,
        filters,
      };

    case 'CROP_SEARCH':
      filters.cropSearch = action.payload.value;

      return {
        ...state,
        filters,
      };

    case 'TOGGLE_FILTER_VALUE':
      return {
        ...state,
        [value]: !state[value],
      };

    case 'SET_DRAINAGE_FILTER':
      return {
        ...state,
        filters: {
          ...filters,
          soilDrainageFilter: action.payload.soilDrainageFilter,
        },
      };

    case 'SET_ADDITIONAL_DRAINAGE_FILTER':
      return {
        ...state,
        filters: {
          ...filters,
          additionalSoilDrainageFilter: action.payload.additionalSoilDrainageFilter,
        },
      };

    case 'SET_IRRIGATION_FILTER':
      return {
        ...state,
        filters: {
          ...filters,
          irrigationFilter: action.payload.irrigationFilter,
        },
      };

    case 'SET_CROP_GROUP_FILTER':
      return {
        ...state,
        filters: {
          ...filters,
          cropGroupFilter: action.payload.cropGroupFilter,
        },
      };

    default:
      return { ...state };
  }
};

export default filterReducer;
