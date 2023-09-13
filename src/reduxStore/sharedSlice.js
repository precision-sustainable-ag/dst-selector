const initialState = {
  progress: 0,
  snackOpen: false,
  snackMessage: '',
  ajaxInProgress: false,
  myCoverCropActivationFlag: false,
  speciesSelectorActivationFlag: true,
  comparisonKeys: [],
  myCoverCropListLocation: '',
  regionToggle: true,
  dataDictionary: {},
  apiBaseUrl: /(localhost|dev)/i.test(window.location)
    ? 'developapi'
    : 'api',
};

export const updateProgress = (value) => ({
  type: 'UPDATE_PROGRESS',
  payload: {
    value,
  },
});

export const gotoProgress = (value) => ({
  type: 'GOTO_PROGRESS',
  payload: {
    value,
  },
});

export const snackHandler = ({ snackOpen, snackMessage }) => ({
  type: 'SNACK',
  payload: {
    snackOpen,
    snackMessage,
  },
});

export const setAjaxInProgress = (value) => ({
  type: 'SET_AJAX_IN_PROGRESS',
  payload: {
    value,
  },
});

export const updateComparisonKeys = (value) => ({
  type: 'UPDATE_COMPARISON_KEYS',
  payload: {
    value,
  },
});

export const activateMyCoverCropListTile = ({ myCoverCropActivationFlag, speciesSelectorActivationFlag }) => ({
  type: 'ACTIVATE_MY_COVER_CROP_LIST_TILE',
  payload: {
    myCoverCropActivationFlag,
    speciesSelectorActivationFlag,
  },
});

export const activateSpeicesSelectorTile = ({ myCoverCropActivationFlag, speciesSelectorActivationFlag }) => ({
  type: 'ACTIVATE_SPECIES_SELECTOR_TILE',
  payload: {
    myCoverCropActivationFlag,
    speciesSelectorActivationFlag,
  },
});

export const myCropListLocation = ({ from }) => ({
  type: 'MY_CROP_LIST_LOCATION',
  payload: {
    from,
  },
});

export const regionToggleHandler = (value) => ({
  type: 'REGION_TOGGLE',
  payload: {
    value,
  },
});

export const pullDictionaryData = (value) => ({
  type: 'PULL_DICTIONARY_DATA',
  payload: {
    value,
  },
});

const sharedReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      if (action.payload.value === 'INCREMENT') {
        return { ...state, progress: state.progress + 1 };
      }
      if (action.payload.value === 'DECREMENT') {
        return { ...state, progress: state.progress - 1 };
      }
      if (action.payload.value === 'HOME') {
        return { ...state, progress: 0 };
      }
      return { ...state };

    case 'GOTO_PROGRESS':
      return {
        ...state,
        progress: action.payload.value,
      };

    case 'SNACK':
      return {
        ...state,
        snackOpen: action.payload.snackOpen,
        snackMessage: action.payload.snackMessage,
      };

    case 'SET_AJAX_IN_PROGRESS':
      return {
        ...state,
        ajaxInProgress: action.payload.value,
      };

    case 'ACTIVATE_MY_COVER_CROP_LIST_TILE':
      return {
        ...state,
        myCoverCropActivationFlag: action.payload.myCoverCropActivationFlag,
        speciesSelectorActivationFlag: action.payload.speciesSelectorActivationFlag,
      };

    case 'ACTIVATE_SPECIES_SELECTOR_TILE':
      return {
        ...state,
        myCoverCropActivationFlag: action.payload.myCoverCropActivationFlag,
        speciesSelectorActivationFlag: action.payload.speciesSelectorActivationFlag,
      };

    case 'UPDATE_COMPARISON_KEYS':
      return {
        ...state,
        comparisonKeys: [...action.payload.value],
      };

    case 'MY_CROP_LIST_LOCATION':
      return {
        ...state,
        myCoverCropListLocation: action.payload.from,
      };

    case 'REGION_TOGGLE':
      return { ...state, regionToggle: !state.regionToggle };

    case 'PULL_DICTIONARY_DATA': {
      return {
        ...state,
        dataDictionary: action.payload.value,
      };
    }

    default:
      return { ...state };
  }
};

export default sharedReducer;
