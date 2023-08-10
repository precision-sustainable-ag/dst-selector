import { legacy_createStore as createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import cropDataReducer from './cropSlice';
import weatherReducer from './weatherSlice';
import MapReducer from './mapSlice';
import goalsReducer from './goalSlice';
import soilReducer from './soilSlice';
import filterReducer from './filterSlice';
import addressReducer from './addressSlice';
import sharedReducer from './sharedSlice';

export const reset = () => ({
  type: 'RESET',
});

const configureStore = () => {
  const appReducer = combineReducers({
    cropData: cropDataReducer,
    mapData: MapReducer,
    weatherData: weatherReducer,
    goalsData: goalsReducer,
    sharedData: sharedReducer,
    soilData: soilReducer,
    filterData: filterReducer,
    addressData: addressReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
      const { routing } = state;
      state = { routing };
    }

    return appReducer(state, action);
  };

  const store = createStore(rootReducer, devToolsEnhancer());
  return store;
};

export default configureStore;
