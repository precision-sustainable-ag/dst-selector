import { legacy_createStore as createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import cropDataReducer from './cropSlice';
import weatherReducer from './weatherSlice';
import MapReducer from './mapSlice';
import goalsReducer from './goalSlice';
import UIReducer from './sharedSlice';
import soilReducer from './soilSlice';
import filterReducer from './filterSlice';
import addressReducer from './addressSlice';

const configureStore = () => {
  const rootReducer = combineReducers({
    cropData: cropDataReducer,
    mapData: MapReducer,
    weatherData: weatherReducer,
    goalsData: goalsReducer,
    UIData: UIReducer,
    soilData: soilReducer,
    filterData: filterReducer,
    addressData: addressReducer,
  });

  const store = createStore(rootReducer, devToolsEnhancer());
  return store;
};

export default configureStore;
