const initialState = {
  allGoals: [],
  selectedGoals: [],
  plantingSeasons: [],
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

export const updateAllGoals = (value) => ({
  type: 'UPDATE_ALL_GOALS',
  payload: {
    value,
  },
});

export const updatePlantingSeasons = (value) => ({
  type: 'UPDATE_PLANTING_SEASONS',
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

    case 'UPDATE_ALL_GOALS':
      return {
        ...state,
        allGoals: action.payload.value,
      };

    case 'UPDATE_PLANTING_SEASONS':
      return {
        ...state,
        plantingSeasons: action.payload.value,
      };

    case 'SET_GOALS_REDUX':
      return { ...state, ...action.payload.goalsData };

    default:
      return { ...state };
  }
};

export default goalsReducer;
