import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PropertiesReducer from './PropertiesReducer';
import UnitsReducer from './UnitsReducer';
import CardsReducer from './CardsReducer';

export default combineReducers({
  auth: AuthReducer,
  properties: PropertiesReducer,
  units: UnitsReducer,
  cards: CardsReducer,
});
