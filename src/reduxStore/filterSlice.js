const initialState = {
    explorer: {
        // filters for explorer
        cropSearch: '',
        // zone is also initialised in the addressData slice
        zone: 6, // needs a default so the filters will populate when starting with species-selector
      },
    
      selector: {
        // filters for selector
        cropSearch: '',
      },
    changedFilters: true,
};

export const clearFilters = () => {
    return {
        type: 'CLEAR_FILTERS',
    };
};

export const filterToggle = ({value}) => {
    return {
        type: 'FILTER_TOGGLE',
        payload: {
            value,
        }
    }
};

export const filterOn = (value) => {
    return {
        type: 'FILTER_ON',
        payload: {
            value,
        },
    };
};

export const filterOff = (value) => {
    return {
        type: 'FILTER_OFF',
        payload: {
            value,
        },
    };
};

export const cropSearch = (value) => {
    return {
        type: 'CROP_SEARCH',
        payload: {
            value,
        },
    };
};

const filterReducer = (state = initialState, action, value = action && action.payload && action.payload.value) => {
    const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';
    let sfilters = { ...state[section] };

    switch (action.type) {
        case 'CLEAR_FILTERS':
            sfilters = {
                cropSearch: '',
                zone: sfilters.zone,
            };

            return {
                ...state,
                [section]: sfilters, 
                changedFilters: true,
            };
        
        case 'FILTER_TOGGLE':
            sfilters[value] = !sfilters[value];

            return {
                ...state,
                [section]: sfilters,
                changedFilters: true,
            };
        
        case 'FILTER_ON':
            sfilters[value] = true;

            return {
                ...state,
                [section]: sfilters,
                changedFilters: true,
            };
        
        case 'FILTER_OFF':
            sfilters[value] = false;

            return {
                ...state,
                [section]: sfilters,
                changedFilters: true,
            };
        
        case 'CROP_SEARCH':
            sfilters.cropSearch = action.payload.value;

            return {
                ...state,
                cropSearch: action.payload.value,
                [section]: sfilters,
            };
        
        default:
            return { ...state };
    }
}

export default filterReducer;