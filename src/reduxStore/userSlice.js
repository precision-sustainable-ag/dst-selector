const initialState = {
  accessToken: null,
  field: null,
  consent: false,
  hideConsentModal: false,
  selectedField: null,
};

export const updateAccessToken = (token) => ({
  type: 'UPDATE_ACCESSTOKEN',
  payload: { token },
});

export const updateField = (field) => ({
  type: 'UPDATE_FIELD',
  payload: { field },
});

export const updateConsent = (consent) => ({
  type: 'UPDATE_CONSENT',
  payload: { consent },
});

export const setSelectField = (fieldName) => ({
  type: 'SELECT_FIELD',
  payload: { fieldName },
});

const userReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_ACCESSTOKEN':
      return { ...state, accessToken: action.payload.token };
    case 'UPDATE_FIELD':
      return { ...state, field: action.payload.field };
    case 'UPDATE_CONSENT':
      return { ...state, consent: action.payload.consent, hideConsentModal: true };
    case 'SELECT_FIELD':
      return { ...state, selectedField: action.payload.fieldName };
    default:
      return { ...state };
  }
};

export default userReducer;
