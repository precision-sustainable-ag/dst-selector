// TODO: move address redux into mapData
const initialState = {
  address: '',
  markers: null,
  county: null,
};

export const updateLocation = ({ address, markers, county }) => ({
  type: 'UPDATE_LOCATION',
  payload: {
    address,
    markers,
    county,
  },
});

export const setAddressRedux = (addressData) => ({
  type: 'SET_ADDRESS_REDUX',
  payload: { addressData },
});

const addressReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        address: action.payload.address,
        markers: action.payload.markers,
        county: action.payload.county,
      };
    case 'SET_ADDRESS_REDUX':
      return { ...state, ...action.payload.addressData };
    default:
      return { ...state };
  }
};

export default addressReducer;
