const initialState = {
  accessToken: null,
  field: null,
  consent: {
    status: null,
    date: null,
  },
  selectedFieldId: null,
};

export const updateAccessToken = (token) => ({
  type: 'UPDATE_ACCESSTOKEN',
  payload: { token },
});

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

const userReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_ACCESSTOKEN':
      return { ...state, accessToken: action.payload.token };
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
    default:
      return { ...state };
  }
};

export default userReducer;
