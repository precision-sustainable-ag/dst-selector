const initialState = {
  accessToken: null,
  field: null,
};

export const updateAccessToken = (token) => ({
  type: 'UPDATE_ACCESSTOKEN',
  payload: { token },
});

export const updateField = (field) => ({
  type: 'UPDATE_FIELD',
  payload: { field },
});

const userReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_ACCESSTOKEN':
      return { ...state, accessToken: action.payload.token };
    case 'UPDATE_FIELD':
      return { ...state, field: action.payload.field };
    default:
      return { ...state };
  }
};

export default userReducer;
