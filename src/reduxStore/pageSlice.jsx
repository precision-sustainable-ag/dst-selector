export const setTableWidth = (width) => ({
  type: 'SET_TABLE_WIDTH',
  payload: width,
});

export const setSidebarWidth = (width) => ({
  type: 'SET_SIDEBAR_WIDTH',
  payload: width,
});

export const resetStore = () => ({
  type: 'RESET_STORE',
});

const initialState = {
  tableWidth: 0,
  sidebarWidth: 0,
};

const pageReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'SET_TABLE_WIDTH':
      return { ...state, tableWidth: action.payload };
    case 'SET_SIDEBAR_WIDTH':
      return { ...state, sidebarWidth: action.payload };
    case 'RESET_STORE':
      return initialState;
    default:
      return state;
  }
};

export default pageReducer;
