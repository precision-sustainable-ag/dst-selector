const initialState = {
  address: '',
  markers: [[40.78489145, -74.80733626930342]],
  zone: '',
  county: null,
};

export const updateLocation = ({ address, markers }) => ({
  type: 'UPDATE_LOCATION',
  payload: {
    address,
    markers,
  },
});

export const changeAddress = ({ address }) => ({
  type: 'CHANGE_ADDRESS',
  payload: {
    address,
  },
});

export const changeAddressViaMap = ({ address, county }) => ({
  type: 'CHANGE_ADDRESS_VIA_MAP',
  payload: {
    address,
    county,
  },
});

export const resetAddressData = () => ({
  type: 'RESET_ADDRESS_DATA',
});

const addressReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        address: action.payload.address,
        markers: action.payload.markers,
      };

    case 'CHANGE_ADDRESS':
      return {
        ...state,
        address: action.payload.address,
      };

    case 'CHANGE_ADDRESS_VIA_MAP':
      return {
        ...state,
        address: action.payload.address,
        county: action.payload.county,
      };

    case 'RESET_ADDRESS_DATA':
      return initialState;

    default:
      return { ...state };
  }
};

export default addressReducer;
