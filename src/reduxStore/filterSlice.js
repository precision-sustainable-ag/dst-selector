const initialState = {
  explorer: {
    // filters for explorer
    cropSearch: '',
    zone: 6, // needs a default so the filters will populate when starting with species-selector
  },

  selector: {
    // filters for selector
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

const filterReducer = (state = initialState, action = null) => {
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
  let sfilters = { ...state[section] };
  const value = action && action.payload && action.payload.value;

  switch (action.type) {
    case 'CLEAR_FILTERS':
      sfilters = {
        cropSearch: '',
        zone: sfilters.zone,
      };

      return {
        ...state,
        [section]: sfilters,
      };

    case 'FILTER_TOGGLE':
      sfilters[value] = !sfilters[value];

      return {
        ...state,
        [section]: sfilters,
      };

    case 'FILTER_ON':
      sfilters[value] = true;

      return {
        ...state,
        [section]: sfilters,
      };

    case 'FILTER_OFF':
      sfilters[value] = false;

      return {
        ...state,
        [section]: sfilters,
      };

    case 'CROP_SEARCH':
      sfilters.cropSearch = action.payload.value;

      return {
        ...state,
        cropSearch: action.payload.value,
        [section]: sfilters,
      };

    default:
      return { ...state };
  }
};

export default filterReducer;
