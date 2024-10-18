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
  apiBaseUrl: /(localhost|dev)/i.test(window.location)
    ? 'developapi'
    : 'api',
  openMyCoverCropReset: {
    open: false,
    goBack: true,
  },
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

export const setMyCoverCropReset = (open, goBack = true) => ({
  type: 'SET_MY_COVER_CROP_RESET',
  payload: {
    open,
    goBack,
  },
});

export const setSharedRedux = (sharedData) => ({
  type: 'SET_SHARED_REDUX',
  payload: { sharedData },
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

    case 'SET_MY_COVER_CROP_RESET':
      return {
        ...state,
        openMyCoverCropReset: {
          open: action.payload.open,
          goBack: action.payload.goBack,
        },
      };
    case 'SET_SHARED_REDUX':
      return {
        ...state,
        ...action.payload.sharedData,
      };

    default:
      return { ...state };
  }
};

export default sharedReducer;
