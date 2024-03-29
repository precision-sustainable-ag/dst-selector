const initialState = {
  selectedGoals: [],
  goalsOpen: false,
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

export const addGoals = (value) => ({
  type: 'ADD_GOALS',
  payload: {
    value,
  },
});

export const toggleGoalsOpen = () => ({
  type: 'TOGGLE_GOALS_OPEN',
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

    case 'TOGGLE_GOALS_OPEN':
      return {
        ...state,
        goalsOpen: !state.goalsOpen,
      };

    default:
      return { ...state };
  }
};

export default goalsReducer;
