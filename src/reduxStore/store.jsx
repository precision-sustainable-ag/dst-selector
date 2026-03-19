import { combineReducers, legacy_createStore as createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import addressReducer from './addressSlice';
import cropDataReducer from './cropSlice';
import filterReducer from './filterSlice';
import goalsReducer from './goalSlice';
import MapReducer from './mapSlice';
import pageReducer from './pageSlice';
import sharedReducer from './sharedSlice';
import soilReducer from './soilSlice';
import terminationReducer from './terminationSlice';
import userReducer from './userSlice';
import weatherReducer from './weatherSlice';

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
