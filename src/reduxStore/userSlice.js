const initialState = {
  field: null,
  consent: {
    status: null,
    date: null,
  },
  selectedFieldId: null,
  userSelectRegion: false,
  userHistoryList: [],
  selectedHistory: null,
};

export const updateField = (field) => ({
  type: 'UPDATE_FIELD',
  payload: { field },
});

export const updateConsent = (status, date) => ({
  type: 'UPDATE_CONSENT',
  payload: { status, date },
});

export const setSelectFieldId = (fieldId) => ({
  type: 'SELECT_FIELD',
  payload: { fieldId },
});

// eslint-disable-next-line no-shadow
export const userSelectRegion = (userSelectRegion) => ({
  type: 'USER_SELECT_REGION',
  payload: { userSelectRegion },
});

export const setUserHistoryList = (userHistoryList) => ({
  type: 'SET_USER_HISTORY_LIST',
  payload: { userHistoryList },
});

export const setSelectedHistory = (selectedHistory) => ({
  type: 'SET_SELECTED_HISTORY',
  payload: { selectedHistory },
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
    case 'SELECT_FIELD':
      return { ...state, selectedFieldId: action.payload.fieldId };
    case 'USER_SELECT_REGION':
      return { ...state, userSelectRegion: action.payload.userSelectRegion };
    case 'SET_USER_HISTORY_LIST':
      return { ...state, userHistoryList: action.payload.userHistoryList };
    case 'SET_SELECTED_HISTORY':
      return { ...state, selectedHistory: action.payload.selectedHistory };
    default:
      return { ...state };
  }
};

export default userReducer;
