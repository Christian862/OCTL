import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BoardsReducer from './BoardsReducer';

export default combineReducers({
  auth: AuthReducer,
  boards: BoardsReducer,
});
