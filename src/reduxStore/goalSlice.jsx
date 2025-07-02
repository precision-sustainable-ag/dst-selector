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

export const addGoals = (value) => ({
  type: 'ADD_GOALS',
  payload: {
    value,
  },
});

export const setGoalsRedux = (goalsData) => ({
  type: 'SET_GOALS_REDUX',
  payload: { goalsData },
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

    case 'SET_GOALS_REDUX':
      return { ...state, ...action.payload.goalsData };

    default:
      return { ...state };
  }
};

export default goalsReducer;
