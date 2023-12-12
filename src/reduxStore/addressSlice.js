const initialState = {
  address: '',
  markers: null,
  zone: '',
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

export const changeAddress = ({ address }) => ({
  type: 'CHANGE_ADDRESS',
  payload: {
    address,
  },
});

// export const updateMarker = (value) => {
//     return {
//         type: 'UPDATE_MARKER',
//         payload: {
//             value,
//         },
//     };
// };

const addressReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        address: action.payload.address,
        markers: action.payload.markers,
        county: action.payload.county,
      };

    case 'CHANGE_ADDRESS':
      return {
        ...state,
        address: action.payload.address,
      };

    default:
      return { ...state };
  }
};

export default addressReducer;
