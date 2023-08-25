const initialState = {
  selectedGoals: [],
  allGoals: [],
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

export const resetGoalData = () => ({
  type: 'RESET_GOAL_DATA',
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

    case 'ADD_GOALS':
      return {
        ...state,
        allGoals: action.payload.value,
      };

    case 'TOGGLE_GOALS_OPEN':
      return {
        ...state,
        goalsOpen: !state.goalsOpen,
      };

    case 'RESET_GOAL_DATA':
      return initialState;

    default:
      return { ...state };
  }
};

export default goalsReducer;
