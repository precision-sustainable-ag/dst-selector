const initialState = {
  filters: {
    cropSearch: '',
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

const filterReducer = (state = initialState, action = null) => {
  let filters = { ...state.filters };
  const value = action && action.payload && action.payload.value;
  console.log(filters);
  switch (action.type) {
    case 'CLEAR_FILTERS':
      filters = {
        cropSearch: '',
        zone: filters.zone,
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
        cropSearch: action.payload.value,
        filters,
      };

    case 'TOGGLE_FILTER_VALUE':
      return {
        ...state,
        [value]: !state[value],
      };

    default:
      return { ...state };
  }
};

export default filterReducer;
