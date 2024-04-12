const initialState = {
  address: '',
  markers: null,
};

export const updateLocation = ({ address, markers }) => ({
  type: 'UPDATE_LOCATION',
  payload: {
    address,
    markers,
  },
});

const addressReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        address: action.payload.address,
        markers: action.payload.markers,
      };

    default:
      return { ...state };
  }
};

export default addressReducer;
