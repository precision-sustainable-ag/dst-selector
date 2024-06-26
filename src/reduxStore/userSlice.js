export const historyState = {
  none: 'none',
  new: 'new',
  imported: 'imported',
  updated: 'updated',
};

const initialState = {
  field: null,
  consent: {
    status: null,
    date: null,
  },
  userHistoryList: [],
  selectedHistory: null,
  historyDialogState: {
    open: false,
    type: 'add',
  },
  historyState: historyState.none,
  saveHistory: false,
};

export const updateField = (field) => ({
  type: 'UPDATE_FIELD',
  payload: { field },
});

export const updateConsent = (status, date) => ({
  type: 'UPDATE_CONSENT',
  payload: { status, date },
});

export const setUserHistoryList = (userHistoryList) => ({
  type: 'SET_USER_HISTORY_LIST',
  payload: { userHistoryList },
});

export const setSelectedHistory = (selectedHistory) => ({
  type: 'SET_SELECTED_HISTORY',
  payload: { selectedHistory },
});

export const setHistoryDialogState = (historyDialogState) => ({
  type: 'SET_HISTORY_DIALOG_STATE',
  payload: { historyDialogState },
});

// eslint-disable-next-line no-shadow
export const setHistoryState = (historyState) => ({
  type: 'SET_HISTORY_STATE',
  payload: { historyState },
});

export const setUserRedux = (userData) => ({
  type: 'SET_USER_REDUX',
  payload: { userData },
});

// eslint-disable-next-line no-shadow
export const setSaveHistory = (saveHistory) => ({
  type: 'SAVE_HISTORY',
  payload: { saveHistory },
});

const userReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, field: action.payload.field };
    case 'UPDATE_CONSENT':
      return {
        ...state,
        consent: {
          ...state.consent,
          status: action.payload.status,
          date: action.payload.date,
        },
      };
    case 'SET_USER_HISTORY_LIST':
      return { ...state, userHistoryList: action.payload.userHistoryList };
    case 'SET_SELECTED_HISTORY':
      return { ...state, selectedHistory: action.payload.selectedHistory };
    case 'SET_HISTORY_DIALOG_STATE':
      return {
        ...state,
        historyDialogState: action.payload.historyDialogState,
      };
    case 'SET_HISTORY_STATE':
      return { ...state, historyState: action.payload.historyState };
    case 'SAVE_HISTORY':
      return { ...state, saveHistory: action.payload.saveHistory };
    case 'SET_USER_REDUX':
      return { ...state, ...action.payload.userData };
    default:
      return { ...state };
  }
};

export default userReducer;
