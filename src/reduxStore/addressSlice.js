const initialState = {
    address: '',
    markers: [[40.78489145, -74.80733626930342]],
    addressVerified: false,
    fullAddress: '',
    addressChangedViaMap: false,
    zipCode: 0,
    zone: '', //not initialised earlier
    zoneText: '', //not initialised earlier
    zoneId: null,
    lastZipCode: 0,
    lastZone: '',
    county: null,
    
}

export const updateLocation = ({ address, markers, zipCode }) => {
    return {
        type: 'UPDATE_LOCATION',
        payload: {
            address,
            markers,
            zipCode,
        },
    };
};

export const changeAddress = ({address, addressVerified}) => {
    return {
        type: 'CHANGE_ADDRESS',
        payload: {
            address,
            addressVerified,
        },
    };
};

export const changeAddressViaMap = ({address, fullAddress, zipCode, county, addressVerified}) => {
    return {
        type: 'CHANGE_ADDRESS_VIA_MAP',
        payload: {
            address,
            fullAddress,
            zipCode,
            county,
            addressVerified,
        },
    };
};

export const updateZone = ({zoneText, zone, zoneId}) => {
    return {
        type: 'UPDATE_ZONE',
        payload: {
            zoneText,
            zone,
            zoneId
        },
    };
};

export const updateZipCode = (value) => {
    return {
        type: 'UPDATE_ZIP_CODE',
        payload: {
            value,
        },
    };
};

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

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_LOCATION':
            return {
              ...state,
              address: action.payload.address,
              markers: [[action.payload.latitude, action.payload.longitude]],
              zipCode: action.payload.zipCode  
            };

        case 'CHANGE_ADDRESS':
            console.log('CHANGE_ADDRESS');
            return {
                ...state,
                address: action.payload.address,
                addressVerified: action.payload.addressVerified,
            };
        
        case 'CHANGE_ADDRESS_VIA_MAP':
            console.log('CHANGE_ADDRESS_VIA_MAP');
            return {
                ...state,
                address: action.payload.address,
                fullAddress: action.payload.fullAddress,
                zipCode: action.payload.zipCode,
                county: action.payload.county,
                addressVerified: action.payload.addressVerified,
                addressChangedViaMap: true,
            };
        
        case 'UPDATE_ZONE':
            console.log( 'UPDATE_ZONE');
            return {
                ...state,
                zoneText: action.payload.zoneText,
                zone: action.payload.zone,
                zoneId: action.payload.zoneId,
            };
        
        case 'UPDATE_ZIP_CODE':
            console.log('UPDATE_ZIP_CODE');
            return {
                ...state,
                zipCode: action.payload.value,
            };
        
        case 'LAST_ZIP_CODE':
            console.log('LAST_ZIP_CODE');
            return {
                ...state,
                lastZipCode: action.payload.value,
            };
        
        case 'UPDATE_LAST_ZONE':
            console.log('UPDATE_LAST_ZONE');
            return {
                ...state,
                lastZone: action.payload.value,
            };
            
        default:
            return {...state};
    }
}

export default addressReducer;
