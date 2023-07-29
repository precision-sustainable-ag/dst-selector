const initialState = {
    selectedGoals: [],
    allGoals: [],
}

export const updateSelectedGoal = (value) => {
    return {
        type: 'UPDATE_SELECTED_GOALS',
        payload: {
            value,
        },
    };
};

export const addSelectedGoals = (value) => {
    return {
        type: 'ADD_SELECTED_GOALS',
        payload: {
            value,
        },
    };
};

export const addGoals = (value) => {
    return {
        type: 'ADD_GOALS',
        payload: {
            value,
        },
    };
};

const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_GOALS':
            return {
                ...state,
                selectedGoals: action.payload.value,
            };

        case 'ADD_SELECTED_GOALS':
            return {
                ...state,
                selectedGoals: [...state.selectedGoals, action.payload.value],
            };

        case 'ADD_GOALS':
            return {
                ...state,
                allGoals: action.payload.value,
            };
        default:
            return { ...state };
    }
}

export default goalsReducer;