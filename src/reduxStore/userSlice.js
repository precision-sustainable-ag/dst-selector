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
    default:
      return { ...state };
  }
};

export default userReducer;
