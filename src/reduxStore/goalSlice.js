const initialState = {
  selectedGoals: [],
};

export const updateSelectedGoal = (value) => ({
  type: 'UPDATE_SELECTED_GOALS',
  payload: {
    value,
  },
});

export const addSelectedGoals = (value) => ({
  type: 'ADD_SELECTED_GOALS',
  payload: {
    value,
  },
});

const goalsReducer = (state = initialState, action = null) => {
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

    default:
      return { ...state };
  }
};

export default goalsReducer;
