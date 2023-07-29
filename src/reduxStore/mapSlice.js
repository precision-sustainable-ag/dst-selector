const initialState = {
    regions: [],
    regionId: null,
    regionLabel: null,
    regionShorthand: null,
    stateId: '',
    stateName: '',
    councilShorthand: '',
    councilLabel: '',
    selectedRegion: {},
    council: '',
}

export const updateRegions = (value) => {
    return {
        type: 'UPDATE_REGIONS',
        payload: {
            value,
        },
    };
};

export const updateRegion = ({regionId, regionLabel, regionShorthand}) => {
    console.log("IN update region action creator");
    return {
        type: 'UPDATE_REGION',
        payload: {
            regionId,
            regionLabel,
            regionShorthand,
        },
    };
};

export const updateStateInfo = ({stateName, stateId,  councilShorthand, councilLabel}) => {
    return {
        type:'UPDATE_STATE_INFO',
        payload: {
            stateName,
            stateId,
            councilShorthand,
            councilLabel,
        },
    };
};

const MapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_REGIONS':
            return {
                ...state,
                regions: action.payload.value,
            };
        
        case 'UPDATE_REGION':
            return {
                ...state,
                regionId: action.payload.regionId,
                regionLabel: action.payload.regionLabel,
                regionShorthand: action.payload.regionShorthand,
            };    

        case 'UPDATE_STATE_INFO':
            console.log("state info", action.payload);
            return {
                ...state,
                stateName: action.payload.stateName,
                councilLabel: action.payload.councilLabel,
                councilShorthand: action.payload.councilShorthand,
                stateId: action.payload.stateId,
            };
        
        default:
            return { ...state };
    }
};

export default MapReducer;
