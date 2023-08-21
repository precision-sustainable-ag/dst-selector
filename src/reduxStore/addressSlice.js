const initialState = {
  address: '',
  markers: [[40.78489145, -74.80733626930342]],
  fullAddress: '',
  zipCode: 0,
  zone: '',
  zoneText: '',
  zoneId: null,
  lastZipCode: 0,
  lastZone: '',
  county: null,
};

export const updateLocation = ({ address, markers, zipCode }) => ({
  type: 'UPDATE_LOCATION',
  payload: {
    address,
    markers,
    zipCode,
  },
});

export const changeAddress = ({ address }) => ({
  type: 'CHANGE_ADDRESS',
  payload: {
    address,
  },
});

export const changeAddressViaMap = ({
  address,
  fullAddress,
  zipCode,
  county,
}) => ({
  type: 'CHANGE_ADDRESS_VIA_MAP',
  payload: {
    address,
    fullAddress,
    zipCode,
    county,
  },
});

export const updateZone = ({ zoneText, zone, zoneId }) => ({
  type: 'UPDATE_ZONE',
  payload: {
    zoneText,
    zone,
    zoneId,
  },
});

export const updateZipCode = (value) => ({
  type: 'UPDATE_ZIP_CODE',
  payload: {
    value,
  },
});

export const lastZipCode = (value) => ({
  type: 'LAST_ZIP_CODE',
  payload: {
    value,
  },
});

export const updateLastZone = (value) => ({
  type: 'UPDATE_LAST_ZONE',
  payload: {
    value,
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
        zipCode: action.payload.zipCode,
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
        fullAddress: action.payload.fullAddress,
        zipCode: action.payload.zipCode,
        county: action.payload.county,
      };

    case 'UPDATE_ZONE':
      return {
        ...state,
        zoneText: action.payload.zoneText,
        zone: action.payload.zone,
        zoneId: action.payload.zoneId,
      };

    case 'UPDATE_ZIP_CODE':
      return {
        ...state,
        zipCode: action.payload.value,
      };

    case 'LAST_ZIP_CODE':
      return {
        ...state,
        lastZipCode: action.payload.value,
      };

    case 'UPDATE_LAST_ZONE':
      return {
        ...state,
        lastZone: action.payload.value,
      };

    default:
      return { ...state };
  }
};

export default addressReducer;
