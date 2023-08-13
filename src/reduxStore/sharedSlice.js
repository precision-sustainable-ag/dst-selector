const initialState = {
  progress: 0,
  consent: false,
  snackOpen: false,
  snackMessage: '',
  ajaxInProgress: false,
  myCoverCropActivationFlag: false,
  speciesSelectorActivationFlag: true,
  comparisonKeys: [],
  myCoverCropListLocation: '',
  snackVertical: 'bottom',
  snackHorizontal: 'right',
  zoneToggle: true,
};

export const toggleValue = (value) => ({
  type: 'TOGGLE',
  payload: {
    value,
  },
});

export const updateProgress = (value) => ({
  type: 'UPDATE_PROGRESS',
  payload: {
    value,
  },
});

export const updateConsent = (value) => ({
  type: 'UPDATE_CONSENT',
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

export const zoneToggleHandler = (value) => ({
  type: 'ZONE_TOGGLE',
  payload: {
    value,
  },
});

const sharedReducer = (state = initialState, action = null) => {
  const value = action && action.payload && action.payload.value;
  console.log('VALUE: ', value);
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        [value]: !state[value],
      };

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

    case 'UPDATE_CONSENT':
      if (action.payload.value === true) {
        return { ...state, consent: true };
      }
      if (action.payload.value === false) {
        return { ...state, consent: false };
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
        comparisonKeys: action.payload.value,
      };

    case 'MY_CROP_LIST_LOCATION':
      return {
        ...state,
        myCoverCropListLocation: action.payload.from,
      };

    case 'ZONE_TOGGLE':
      return { ...state, zoneToggle: action.payload.value };

    default:
      return { ...state };
  }
};

export default sharedReducer;
