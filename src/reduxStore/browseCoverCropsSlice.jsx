const initialState = {
  response: null,
};

export const updateResponse = (response) => ({
  type: 'UPDATE_RESPONSE',
  payload: { response },
});

const responseReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_RESPONSE':
      state.response = action.payload.response;
      return state;
    default:
      return state;
  }
};

export default responseReducer;
