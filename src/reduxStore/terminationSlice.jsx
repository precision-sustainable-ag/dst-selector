const initialState = {
  selectedSeason: null,
  selectedFlowering: null,
  selectedIrrigation: null,
  tags: [],
};

export const updateSelectedSeason = (season) => ({
  type: 'UPDATE_SELECTED_SEASON',
  payload: season,
});

export const updateSelectedFlowering = (floweringType) => ({
  type: 'UPDATE_SELECTED_FLOWERING',
  payload: floweringType,
});

export const updateSelectedIrrigation = (irrigationType) => ({
  type: 'UPDATE_SELECTED_IRRIGATION',
  payload: irrigationType,
});

export const updateTags = (tags) => ({
  type: 'UPDATE_TAGS',
  payload: tags,
});

const terminationsReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_SEASON':
      return { ...state, selectedSeason: action.payload };

    case 'UPDATE_SELECTED_FLOWERING':
      return { ...state, selectedFlowering: action.payload };

    case 'UPDATE_SELECTED_IRRIGATION':
      return { ...state, selectedIrrigation: action.payload };

    case 'UPDATE_TAGS':
      return { ...state, tags: action.payload };

    default:
      return state;
  }
};

export default terminationsReducer;
