const initialState = {
  user: null,
  accessToken: null,
  field: null,
};

// TODO: might not need to save the user since it can directly get from useAuth0
export const userLogin = (user) => ({
  type: 'USER_LOGIN',
  payload: { user },
});

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

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
    case 'USER_LOGIN':
      return { ...state, user: action.payload.user };
    case 'USER_LOGOUT':
      return { ...initialState };
    case 'UPDATE_ACCESSTOKEN':
      return { ...state, accessToken: action.payload.token };
    case 'UPDATE_FIELD':
      return { ...state, field: action.payload.field };
    default:
      return { ...state };
  }
};

export default userReducer;
