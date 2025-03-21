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
import userReducer from './userSlice';
import pageReducer from './pageSlice';
import terminationReducer from './terminationSlice';

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
    userData: userReducer,
    pageData: pageReducer,
    terminationData: terminationReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
      return {
        ...state,
        cropData: cropDataReducer(undefined, action),
        mapData: MapReducer(undefined, action),
        weatherData: weatherReducer(undefined, action),
        goalsData: goalsReducer(undefined, action),
        sharedData: sharedReducer(undefined, action),
        soilData: soilReducer(undefined, action),
        filterData: filterReducer(undefined, action),
        addressData: addressReducer(undefined, action),
        userData: userReducer(undefined, action),
        pageData: pageReducer(undefined, action),
        terminationData: terminationReducer(undefined, action),
      };
    }

    return appReducer(state, action);
  };

  const store = createStore(rootReducer, devToolsEnhancer());
  return store;
};

export default configureStore;
